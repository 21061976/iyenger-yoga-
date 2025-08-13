import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronRight, 
  ChevronLeft, 
  Clock, 
  User, 
  Target, 
  AlertCircle, 
  CheckCircle, 
  PlayCircle 
} from 'lucide-react';

const IyengarYogaApp = () => {
  const [currentStage, setCurrentStage] = useState(1);
  const [currentSession, setCurrentSession] = useState(null);
  const [currentPose, setCurrentPose] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [selectedPose, setSelectedPose] = useState(null);
  const [sessionInProgress, setSessionInProgress] = useState(false);

  const stages = {
    1: {
      title: "שלב 1: יסודות והכנה",
      duration: "20 דקות",
      frequency: "3 פעמים בשבוע",
      weeks: "שבועות 1-4",
      focus: "בניית מודעות גופנית ויסודות יציבה",
      session: {
        title: "סשן יסודות - בניית חיבור לגוף",
        totalDuration: "20 דקות",
        theme: "מודעות, יציבה ויציבות פנימית",
        sequence: [
          {
            phase: "פתיחה ומרכוז",
            duration: "3 דקות",
            poses: [
              {
                name: "ישיבה שקטה - Sukhasana",
                hebrewName: "סוקהאסנה - ישיבה נוחה",
                duration: "2 דקות",
                purpose: "מרכוז והכנת המודעות",
                instructions: [
                  "שב בישיבה נוחה על כרית עם עמוד השדרה זקוף",
                  "הנח את הידיים על הברכיים",
                  "סגור את העיניים ונשום עמוק 10 נשימות",
                  "הכוון את המודעות פנימה וקבע כוונה לתרגול"
                ]
              }
            ]
          }
        ]
      }
    }
  };

  useEffect(() => {
    let interval;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const resetTimer = () => {
    setTimeElapsed(0);
    setIsTimerRunning(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4" dir="rtl">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-800 mb-2">יוגה איינגר - סשנים הוליסטיים</h1>
          <p className="text-gray-600">תרגול מעגלי ושלם עם היגיון פנימי לכל שלב</p>
        </header>
        
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">האפליקציה בבנייה 🚧</h2>
          <p className="text-gray-600">אנחנו עובדים על משהו מדהים עבורך!</p>
        </div>
      </div>
    </div>
  );
};

export default IyengarYogaApp;
