"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CATEGORIES, Category, getCategoryById } from "@/data/categories";
import { analyzeProblem, AIAnalysisResult } from "@/lib/analyzeProblem";
import { createNewBooking } from "@/data/bookings";
import {
  X,
  Camera,
  Video,
  UploadCloud,
  Mic,
  MicOff,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  ShieldCheck,
  Wrench,
  Scale,
  RefreshCw,
  Trash2,
  Plus,
  Play,
  Pause,
} from "lucide-react";

interface ShowProblemModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedCategoryId?: string | null;
}

type TabType = "photo" | "video" | "upload";

export function ShowProblemModal({
  isOpen,
  onClose,
  preselectedCategoryId,
}: ShowProblemModalProps) {
  const router = useRouter();

  // Modal Step State:
  // 1 = category, 2 = capture, 3 = describe, 4 = analyzing, 5 = result, 6 = bookingSlot
  const [step, setStep] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<Category>(
    getCategoryById(preselectedCategoryId || "refrigerator")
  );

  // Capture Tabs & Media
  const [activeTab, setActiveTab] = useState<TabType>("photo");
  const [capturedImages, setCapturedImages] = useState<string[]>([]);
  const [recordedVideoUrl, setRecordedVideoUrl] = useState<string | null>(null);

  // Camera stream state
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  // Video recording state
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Description & Voice input
  const [description, setDescription] = useState("");
  const [isListening, setIsListening] = useState(false);
  const speechRecognitionRef = useRef<any>(null);

  // Analysis result
  const [aiResult, setAiResult] = useState<AIAnalysisResult | null>(null);
  const [showDiyDetails, setShowDiyDetails] = useState(false);
  const [showReplaceDetails, setShowReplaceDetails] = useState(false);

  // Slot & Address state for Booking
  const [appointmentDate, setAppointmentDate] = useState("Today");
  const [appointmentWindow, setAppointmentWindow] = useState("02:00 PM - 04:00 PM");
  const [address, setAddress] = useState(
    "Flat 402, Green Glen Layout, Outer Ring Road, Bellandur, Bengaluru"
  );
  const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);

  // Stop all camera & audio tracks
  const stopMediaStream = useCallback(() => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);

    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
      recordingTimerRef.current = null;
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
  }, []);

  // Initialize camera when entering step 2 with photo or video tab
  const startCamera = useCallback(async () => {
    stopMediaStream();
    setCameraError(null);

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCameraError("Camera access is not supported by your browser. Please use the Upload tab.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: "environment" },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: activeTab === "video",
      });

      mediaStreamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch(() => {});
      }
      setIsCameraActive(true);
    } catch (err: any) {
      console.warn("Camera start error:", err);
      if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
        setCameraError(
          "Camera permission was denied. Please enable camera permissions in browser settings or use the Upload tab."
        );
      } else if (err.name === "NotFoundError" || err.name === "DevicesNotFoundError") {
        setCameraError("No camera device was detected on your hardware. Please use the Upload tab.");
      } else {
        setCameraError("Unable to access camera. Please switch to the Upload tab.");
      }
    }
  }, [activeTab, stopMediaStream]);

  // Handle modal open/close
  useEffect(() => {
    if (isOpen) {
      if (preselectedCategoryId) {
        setSelectedCategory(getCategoryById(preselectedCategoryId));
        setStep(2); // Skip category selection if preselected!
      } else {
        setStep(1);
      }
      setCapturedImages([]);
      setRecordedVideoUrl(null);
      setDescription("");
      setAiResult(null);
      setShowDiyDetails(false);
      setShowReplaceDetails(false);
    } else {
      stopMediaStream();
      if (speechRecognitionRef.current) {
        try {
          speechRecognitionRef.current.stop();
        } catch (_) {}
      }
      setIsListening(false);
    }
  }, [isOpen, preselectedCategoryId, stopMediaStream]);

  // ESC key listener for accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Switch camera when step or tab changes
  useEffect(() => {
    if (isOpen && step === 2) {
      if (activeTab === "photo" || activeTab === "video") {
        startCamera();
      } else {
        stopMediaStream();
      }
    } else {
      stopMediaStream();
    }
    return () => stopMediaStream();
  }, [isOpen, step, activeTab, startCamera, stopMediaStream]);

  // Compress image client side (max 1280px)
  const compressImage = (base64Str: string): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = base64Str;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_DIM = 1280;
        let width = img.width;
        let height = img.height;

        if (width > height && width > MAX_DIM) {
          height = Math.round((height * MAX_DIM) / width);
          width = MAX_DIM;
        } else if (height > MAX_DIM) {
          width = Math.round((width * MAX_DIM) / height);
          height = MAX_DIM;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL("image/jpeg", 0.85));
        } else {
          resolve(base64Str);
        }
      };
      img.onerror = () => resolve(base64Str);
    });
  };

  // Capture photo from video stream
  const capturePhoto = async () => {
    if (!videoRef.current || capturedImages.length >= 5) return;

    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const rawData = canvas.toDataURL("image/jpeg", 0.9);
    const compressed = await compressImage(rawData);

    setCapturedImages((prev) => [...prev, compressed]);
  };

  // Remove photo thumbnail
  const removePhoto = (index: number) => {
    setCapturedImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle file uploads (images & video)
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const remainingSlots = 5 - capturedImages.length;
    const toProcess = Array.from(files).slice(0, remainingSlots);

    for (const file of toProcess) {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = async (event) => {
          if (event.target?.result) {
            const compressed = await compressImage(event.target.result as string);
            setCapturedImages((prev) => (prev.length < 5 ? [...prev, compressed] : prev));
          }
        };
        reader.readAsDataURL(file);
      } else if (file.type.startsWith("video/")) {
        const url = URL.createObjectURL(file);
        setRecordedVideoUrl(url);
      }
    }
  };

  // Video Recording Controls (MediaRecorder with 30s max timer)
  const startRecording = () => {
    if (!mediaStreamRef.current) return;
    recordedChunksRef.current = [];
    setRecordingSeconds(0);

    try {
      const recorder = new MediaRecorder(mediaStreamRef.current, {
        mimeType: MediaRecorder.isTypeSupported("video/webm;codecs=vp9")
          ? "video/webm;codecs=vp9"
          : "video/webm",
      });

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        setRecordedVideoUrl(url);
      };

      recorder.start(500);
      mediaRecorderRef.current = recorder;
      setIsRecording(true);

      recordingTimerRef.current = setInterval(() => {
        setRecordingSeconds((prev) => {
          if (prev >= 29) {
            stopRecording();
            return 30;
          }
          return prev + 1;
        });
      }, 1000);
    } catch (e) {
      console.error("Recording error:", e);
    }
  };

  const stopRecording = () => {
    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
      recordingTimerRef.current = null;
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
  };

  // Web Speech API Voice Recognition
  const toggleVoiceInput = () => {
    if (typeof window === "undefined") return;

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice input is not supported in this browser. Please type your description.");
      return;
    }

    if (isListening) {
      speechRecognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-IN";

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);

      recognition.onresult = (event: any) => {
        let transcript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setDescription((prev) => (prev ? `${prev} ${transcript}` : transcript));
      };

      recognition.start();
      speechRecognitionRef.current = recognition;
    } catch (e) {
      console.error("Speech Recognition error:", e);
      setIsListening(false);
    }
  };

  // Run Analysis Flow
  const triggerAnalysis = async () => {
    stopMediaStream();
    setStep(4); // Analyzing animation

    const result = await analyzeProblem(
      selectedCategory.id,
      description,
      capturedImages.length || (recordedVideoUrl ? 1 : 1)
    );

    setAiResult(result);
    setStep(5); // Show Results
  };

  // Confirm booking & redirect to /bookings
  const handleConfirmBooking = () => {
    if (!aiResult) return;
    setIsSubmittingBooking(true);

    const title = `${selectedCategory.name}: ${aiResult.likelyProblem}`;
    const windowFormatted = `${appointmentDate} (${appointmentWindow})`;

    createNewBooking(
      title,
      selectedCategory.id,
      windowFormatted,
      address,
      aiResult.estimatedCostMin,
      aiResult.recommendedTechnicianRole
    );

    setTimeout(() => {
      setIsSubmittingBooking(false);
      onClose();
      router.push("/bookings");
    }, 700);
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Show Your Problem Diagnostic Flow"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto"
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/85 backdrop-blur-md"
      />

      {/* Main Modal Container */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.98 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full sm:max-w-2xl max-h-[92vh] sm:max-h-[88vh] rounded-t-3xl sm:rounded-3xl bg-[#050B1F] border border-teal-500/30 p-6 sm:p-8 shadow-[0_0_60px_rgba(45,212,191,0.25)] z-10 flex flex-col overflow-hidden"
      >
        {/* Ambient Glow */}
        <div className="absolute -top-32 -right-32 w-80 h-80 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Top Bar: Step Indicator & Close */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-semibold text-teal-400 bg-teal-500/10 px-2.5 py-1 rounded-full border border-teal-500/20 uppercase">
              Step {step} of 5
            </span>
            <span className="text-xs text-slate-400 font-medium">
              {step === 1 && "Select Category"}
              {step === 2 && "Capture Hardware Problem"}
              {step === 3 && "Describe Fault"}
              {step === 4 && "AI Diagnostic Engine"}
              {step === 5 && "Diagnostic Assessment"}
              {step === 6 && "Schedule Verified Technician"}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body Content */}
        <div className="flex-1 overflow-y-auto py-5 space-y-5 pr-1">
          {/* ================= STEP 1: CHOOSE CATEGORY ================= */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  What item needs attention?
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Select your product type to calibrate camera vision models and specialist matching.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[50vh] overflow-y-auto pr-1">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(cat);
                      setStep(2);
                    }}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      selectedCategory.id === cat.id
                        ? "bg-teal-500/15 border-teal-400 shadow-[0_0_15px_rgba(45,212,191,0.25)]"
                        : "bg-white/[0.03] hover:bg-white/[0.06] border-white/10 hover:border-white/20"
                    }`}
                  >
                    <span className="text-sm font-semibold text-white">{cat.name}</span>
                    <span className="text-[11px] text-teal-400/80 font-mono mt-2">
                      {cat.subItems.slice(0, 2).join(", ")}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ================= STEP 2: CAPTURE PROBLEM ================= */}
          {step === 2 && (
            <div className="space-y-4">
              {/* Category chip preview */}
              <div className="flex items-center justify-between bg-white/[0.03] border border-white/10 px-3.5 py-2 rounded-xl text-xs">
                <span className="text-slate-300">
                  Diagnosing: <strong className="text-teal-300">{selectedCategory.name}</strong>
                </span>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-teal-400 hover:underline text-[11px]"
                >
                  Change
                </button>
              </div>

              {/* 3 Tabs: Photo | Video | Upload */}
              <div className="flex p-1 rounded-xl bg-white/[0.04] border border-white/10 text-xs">
                <button
                  type="button"
                  onClick={() => setActiveTab("photo")}
                  className={`flex-1 py-2 rounded-lg font-medium transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    activeTab === "photo"
                      ? "bg-teal-400 text-slate-950 font-bold shadow-md"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>Photo ({capturedImages.length}/5)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("video")}
                  className={`flex-1 py-2 rounded-lg font-medium transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    activeTab === "video"
                      ? "bg-teal-400 text-slate-950 font-bold shadow-md"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Video (30s)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("upload")}
                  className={`flex-1 py-2 rounded-lg font-medium transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    activeTab === "upload"
                      ? "bg-teal-400 text-slate-950 font-bold shadow-md"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <UploadCloud className="w-3.5 h-3.5" />
                  <span>Gallery</span>
                </button>
              </div>

              {/* Tab 1: Photo Viewfinder */}
              {activeTab === "photo" && (
                <div className="space-y-3">
                  <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-950 border border-teal-500/30 shadow-inner flex items-center justify-center">
                    {cameraError ? (
                      <div className="p-6 text-center space-y-2">
                        <AlertTriangle className="w-8 h-8 text-amber-400 mx-auto" />
                        <p className="text-xs text-slate-300 max-w-sm">{cameraError}</p>
                        <button
                          type="button"
                          onClick={() => setActiveTab("upload")}
                          className="px-4 py-1.5 rounded-full bg-teal-400 text-slate-950 text-xs font-semibold"
                        >
                          Switch to Gallery Upload
                        </button>
                      </div>
                    ) : (
                      <>
                        <video
                          ref={videoRef}
                          autoPlay
                          playsInline
                          muted
                          className="w-full h-full object-cover"
                        />

                        {/* Scanner overlay brackets */}
                        <div className="absolute inset-8 border border-teal-400/30 rounded-lg pointer-events-none">
                          <span className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-teal-400" />
                          <span className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-teal-400" />
                          <span className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-teal-400" />
                          <span className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-teal-400" />
                        </div>

                        {/* Capture Shutter Button */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
                          <button
                            type="button"
                            onClick={capturePhoto}
                            disabled={capturedImages.length >= 5}
                            className="w-14 h-14 rounded-full bg-white border-4 border-teal-400 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(45,212,191,0.6)] flex items-center justify-center cursor-pointer transition-all disabled:opacity-50"
                            aria-label="Capture photograph"
                          >
                            <div className="w-10 h-10 rounded-full bg-teal-400" />
                          </button>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Thumbnail Row */}
                  {capturedImages.length > 0 && (
                    <div className="flex items-center gap-2 overflow-x-auto py-1">
                      {capturedImages.map((src, i) => (
                        <div key={i} className="relative w-16 h-16 rounded-xl overflow-hidden border border-teal-400/50 shrink-0">
                          <img src={src} alt={`Problem photo ${i + 1}`} className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => removePhoto(i)}
                            className="absolute top-1 right-1 p-1 rounded-full bg-slate-950/80 text-rose-400 hover:text-white"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                      {capturedImages.length < 5 && (
                        <div className="w-16 h-16 rounded-xl border-2 border-dashed border-white/20 flex flex-col items-center justify-center text-[10px] text-slate-400 shrink-0">
                          <span>{5 - capturedImages.length} left</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Tab 2: Video Recording */}
              {activeTab === "video" && (
                <div className="space-y-3">
                  <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-950 border border-teal-500/30 flex items-center justify-center">
                    {recordedVideoUrl ? (
                      <div className="relative w-full h-full">
                        <video src={recordedVideoUrl} controls className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => setRecordedVideoUrl(null)}
                          className="absolute top-3 right-3 px-3 py-1 rounded-full bg-slate-900/90 text-xs text-white border border-white/20 flex items-center gap-1"
                        >
                          <RotateCcw className="w-3 h-3" /> Retake
                        </button>
                      </div>
                    ) : (
                      <>
                        <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />

                        {/* Visible 30s Countdown / Timer */}
                        <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/80 border border-white/20 text-xs font-mono text-white flex items-center gap-1.5">
                          <span className={`w-2 h-2 rounded-full ${isRecording ? "bg-rose-500 animate-ping" : "bg-slate-500"}`} />
                          <span>00:{recordingSeconds.toString().padStart(2, "0")} / 00:30</span>
                        </div>

                        {/* Record Button */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
                          {!isRecording ? (
                            <button
                              type="button"
                              onClick={startRecording}
                              className="px-5 py-2.5 rounded-full bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold shadow-lg flex items-center gap-2 cursor-pointer transition-all"
                            >
                              <div className="w-3 h-3 rounded-full bg-white" />
                              <span>Record Video</span>
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={stopRecording}
                              className="px-5 py-2.5 rounded-full bg-white text-slate-950 text-xs font-bold shadow-lg flex items-center gap-2 cursor-pointer transition-all animate-pulse"
                            >
                              <div className="w-3 h-3 bg-rose-600 rounded-sm" />
                              <span>Stop Recording</span>
                            </button>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Tab 3: Upload from Gallery / Drag & Drop */}
              {activeTab === "upload" && (
                <div className="space-y-3">
                  <label className="border-2 border-dashed border-white/20 hover:border-teal-400/60 rounded-2xl p-8 text-center bg-white/[0.02] hover:bg-teal-500/[0.04] transition-all cursor-pointer block group">
                    <input
                      type="file"
                      accept="image/*,video/*"
                      multiple
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 group-hover:scale-110 transition-transform">
                      <UploadCloud className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-semibold text-white block">
                      Choose from Gallery or Drop Files
                    </span>
                    <span className="text-xs text-slate-400 mt-1 block">
                      Supports PNG, JPG, HEIC, MP4, WebM (up to 5 photos)
                    </span>
                  </label>

                  {capturedImages.length > 0 && (
                    <div className="flex items-center gap-2 overflow-x-auto py-1">
                      {capturedImages.map((src, i) => (
                        <div key={i} className="relative w-16 h-16 rounded-xl overflow-hidden border border-teal-400/50 shrink-0">
                          <img src={src} alt={`Uploaded ${i + 1}`} className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => removePhoto(i)}
                            className="absolute top-1 right-1 p-1 rounded-full bg-slate-950/80 text-rose-400 hover:text-white"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ================= STEP 3: DESCRIBE & VOICE INPUT ================= */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  Tell us what's happening
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Optional details help our AI pinpoint replacement parts and tool recommendations.
                </p>
              </div>

              {/* Textarea with voice recognition */}
              <div className="relative">
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  placeholder={`e.g. "${selectedCategory.exampleProblem}"`}
                  className="w-full p-4 rounded-2xl bg-white/[0.04] border border-white/15 focus:border-teal-400 focus:outline-none text-white text-sm placeholder:text-slate-500 resize-none shadow-inner"
                />

                {/* Voice Input Button */}
                <button
                  type="button"
                  onClick={toggleVoiceInput}
                  className={`absolute right-3.5 bottom-3.5 px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    isListening
                      ? "bg-rose-500 text-white animate-pulse"
                      : "bg-white/10 hover:bg-white/20 text-slate-200"
                  }`}
                  aria-label="Toggle voice input"
                >
                  {isListening ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                  <span>{isListening ? "Listening..." : "Voice Input"}</span>
                </button>
              </div>

              {/* Media Summary Pill */}
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <CheckCircle2 className="w-4 h-4 text-teal-400" />
                <span>
                  {capturedImages.length > 0
                    ? `${capturedImages.length} photo(s) attached`
                    : recordedVideoUrl
                    ? "Video sample attached"
                    : "No photo attached (visual diagnostic will use archetype library)"}
                </span>
              </div>
            </div>
          )}

          {/* ================= STEP 4: ANALYZING ANIMATION ================= */}
          {step === 4 && (
            <div className="py-12 text-center space-y-6">
              <div className="relative w-28 h-28 mx-auto">
                <div className="absolute inset-0 rounded-full border-4 border-teal-500/20 animate-ping" />
                <div className="relative w-full h-full rounded-3xl bg-teal-500/10 border border-teal-400/50 flex items-center justify-center text-teal-400 shadow-[0_0_40px_rgba(45,212,191,0.4)]">
                  <RefreshCw className="w-12 h-12 animate-spin" />
                </div>
              </div>

              <div>
                <h4 className="text-xl font-extrabold text-white tracking-tight">
                  Running Neural Hardware Diagnostic...
                </h4>
                <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-sm mx-auto">
                  Cross-referencing 25,000+ schematics for {selectedCategory.name} faults, spares,
                  and repair economics.
                </p>
              </div>

              {/* Progress bar */}
              <div className="max-w-xs mx-auto">
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2.8, ease: "easeInOut" }}
                    className="h-full bg-gradient-to-r from-teal-400 to-cyan-300 shadow-[0_0_12px_#2dd4bf]"
                  />
                </div>
                <div className="text-center text-[11px] font-mono text-teal-400 mt-2">
                  Scanning surface topology & thermal curves...
                </div>
              </div>
            </div>
          )}

          {/* ================= STEP 5: AI RESULT SCREEN ================= */}
          {step === 5 && aiResult && (
            <div className="space-y-5">
              {/* Primary Diagnostic Card */}
              <div className="p-5 rounded-2xl bg-teal-950/40 border border-teal-500/40 shadow-inner space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-teal-300 bg-teal-500/20 px-2.5 py-0.5 rounded-full border border-teal-500/30 uppercase">
                    Confidence: {aiResult.confidence}%
                  </span>
                  <span className="text-xs text-slate-300 font-mono">
                    Score: <strong className="text-teal-400">{aiResult.repairabilityScore} / 10</strong>
                  </span>
                </div>

                <div>
                  <h4 className="text-lg sm:text-xl font-bold text-white">
                    {aiResult.likelyProblem}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1">
                    {aiResult.problemDetails}
                  </p>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 border-t border-white/10 text-xs">
                  <div>
                    <span className="text-slate-400 block">Est. Repair Cost:</span>
                    <strong className="text-teal-300 text-sm font-bold">
                      ₹{aiResult.estimatedCostMin} - ₹{aiResult.estimatedCostMax}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Service Time:</span>
                    <strong className="text-white text-sm font-bold">{aiResult.estimatedTime}</strong>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <span className="text-slate-400 block">Specialist:</span>
                    <strong className="text-teal-400 text-xs font-medium">
                      {aiResult.recommendedTechnicianRole}
                    </strong>
                  </div>
                </div>
              </div>

              {/* 3 Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Action 1: Book Technician */}
                <button
                  type="button"
                  onClick={() => setStep(6)}
                  className="py-3 px-4 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-xs text-center shadow-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Wrench className="w-4 h-4" />
                  <span>Book Technician</span>
                </button>

                {/* Action 2: Fix It Myself (DIY Guide) */}
                <button
                  type="button"
                  onClick={() => {
                    setShowDiyDetails(!showDiyDetails);
                    setShowReplaceDetails(false);
                  }}
                  className={`py-3 px-4 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    showDiyDetails
                      ? "bg-teal-500/20 text-teal-300 border-teal-400"
                      : "bg-white/5 hover:bg-white/10 text-white border-white/15"
                  }`}
                >
                  <span>{showDiyDetails ? "Hide DIY Guide" : "Fix it myself (DIY)"}</span>
                </button>

                {/* Action 3: Compare Repair vs Replace */}
                <button
                  type="button"
                  onClick={() => {
                    setShowReplaceDetails(!showReplaceDetails);
                    setShowDiyDetails(false);
                  }}
                  className={`py-3 px-4 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    showReplaceDetails
                      ? "bg-teal-500/20 text-teal-300 border-teal-400"
                      : "bg-white/5 hover:bg-white/10 text-white border-white/15"
                  }`}
                >
                  <span>Compare vs Replace</span>
                </button>
              </div>

              {/* DIY Guide Drawer */}
              {showDiyDetails && (
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3 text-xs">
                  <div className="flex items-center justify-between font-mono text-[11px] text-teal-400 uppercase">
                    <span>DIY Difficulty: {aiResult.diyGuide.difficulty}</span>
                    <span>Tools Needed: {aiResult.diyGuide.toolsNeeded.join(", ")}</span>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-white/10">
                    {aiResult.diyGuide.steps.map((st) => (
                      <div key={st.stepNumber} className="flex gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-teal-500/20 text-teal-300 flex items-center justify-center font-bold shrink-0">
                          {st.stepNumber}
                        </span>
                        <div>
                          <strong className="text-white block">{st.title}</strong>
                          <span className="text-slate-400 leading-relaxed">{st.instruction}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Repair vs Replace Drawer */}
              {showReplaceDetails && (
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3 text-xs">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <span className="text-slate-400 block text-[11px]">Brand New Replacement</span>
                      <strong className="text-lg text-slate-200">
                        ₹{aiResult.repairVsReplace.newProductCost.toLocaleString()}
                      </strong>
                    </div>
                    <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/30">
                      <span className="text-teal-300 block text-[11px]">Professional Repair</span>
                      <strong className="text-lg text-teal-400">
                        ₹{aiResult.repairVsReplace.estimatedRepairCost.toLocaleString()}
                      </strong>
                    </div>
                  </div>
                  <div className="text-teal-300 font-medium">
                    {aiResult.repairVsReplace.verdict}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ================= STEP 6: SCHEDULE BOOKING ================= */}
          {step === 6 && aiResult && (
            <div className="space-y-5">
              <div>
                <h3 className="text-xl font-bold text-white">Select Service Slot</h3>
                <p className="text-xs text-slate-400 mt-1">
                  A verified {aiResult.recommendedTechnicianRole} will arrive with authentic spare parts.
                </p>
              </div>

              {/* Date Selection */}
              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase mb-2">
                  Service Date
                </label>
                <div className="flex gap-2">
                  {["Today", "Tomorrow", "Pick Day"].map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setAppointmentDate(d)}
                      className={`flex-1 py-2 text-xs rounded-xl border transition-all cursor-pointer ${
                        appointmentDate === d
                          ? "bg-teal-400 text-slate-950 font-bold border-teal-300"
                          : "bg-white/5 text-slate-300 border-white/10 hover:border-white/20"
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Window Selection */}
              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase mb-2">
                  2-Hour Arrival Window
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    "10:00 AM - 12:00 PM",
                    "02:00 PM - 04:00 PM",
                    "04:00 PM - 06:00 PM",
                    "06:00 PM - 08:00 PM",
                  ].map((win) => (
                    <button
                      key={win}
                      type="button"
                      onClick={() => setAppointmentWindow(win)}
                      className={`py-2 px-3 text-xs rounded-xl border text-center transition-all cursor-pointer ${
                        appointmentWindow === win
                          ? "bg-teal-400 text-slate-950 font-bold border-teal-300 shadow-sm"
                          : "bg-white/5 text-slate-300 border-white/10 hover:border-white/20"
                      }`}
                    >
                      {win}
                    </button>
                  ))}
                </div>
              </div>

              {/* Address input */}
              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase mb-2">
                  Service Address
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-teal-400 absolute left-3.5 top-3" />
                  <textarea
                    rows={2}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 focus:border-teal-400 focus:outline-none text-white text-xs resize-none"
                  />
                </div>
              </div>

              {/* Pricing & Guarantee */}
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-400 block">Inspection & Service Base Fee:</span>
                  <span className="text-slate-300">Pay after completion</span>
                </div>
                <strong className="text-lg text-teal-300 font-bold">
                  ₹{aiResult.estimatedCostMin}
                </strong>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between shrink-0">
          {step > 1 && step !== 4 ? (
            <button
              type="button"
              onClick={() => setStep((prev) => Math.max(prev - 1, 1))}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {step === 2 && (
            <button
              type="button"
              onClick={() => setStep(3)}
              className="px-6 py-2.5 rounded-full bg-teal-400 hover:bg-teal-300 text-slate-950 text-xs font-bold shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Next: Describe Problem</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}

          {step === 3 && (
            <button
              type="button"
              onClick={triggerAnalysis}
              className="px-6 py-2.5 rounded-full bg-teal-400 hover:bg-teal-300 text-slate-950 text-xs font-bold shadow-[0_0_20px_rgba(45,212,191,0.5)] transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>Diagnose with AI</span>
            </button>
          )}

          {step === 6 && (
            <button
              type="button"
              disabled={isSubmittingBooking}
              onClick={handleConfirmBooking}
              className="px-6 py-2.5 rounded-full bg-teal-400 hover:bg-teal-300 text-slate-950 text-xs font-bold shadow-[0_0_20px_rgba(45,212,191,0.5)] transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <span>{isSubmittingBooking ? "Confirming..." : "Confirm & Schedule"}</span>
              <CheckCircle2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
