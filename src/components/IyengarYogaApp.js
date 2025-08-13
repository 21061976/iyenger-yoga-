import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle, 
  PlayCircle 
} from 'lucide-react';

const IyengarYogaApp = () => {
  const [currentStage, setCurrentStage] = useState(1);
  const [currentSession, setCurrentSession] = useState(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
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
              },
              {
                name: "נשימת הכנה - Dirga Pranayama",
                hebrewName: "דירגה פראנאיאמה",
                duration: "1 דקה",
                purpose: "הכנת מערכת הנשימה",
                instructions: [
                  "נשום אל הבטן, הצלעות והחזה",
                  "שאיפה איטית ל-4 ספירות",
                  "נשיפה איטית ל-6 ספירות"
                ]
              }
            ]
          },
          {
            phase: "חימום עדין",
            duration: "4 דקות",
            poses: [
              {
                name: "תנועות צוואר ועמוד שדרה",
                duration: "2 דקות",
                purpose: "חימום עדין של עמוד השדרה",
                instructions: [
                  "סיבובי צוואר עדינים 5 לכל כיוון",
                  "סיבובי כתפיים 8 אחורה",
                  "סיבוב עמוד שדרה בישיבה לכל צד 30 שניות"
                ]
              },
              {
                name: "Marjaryasana-Bitilasana - חתול-פרה",
                hebrewName: "מארג'ריאסנה-ביטילאסנה",
                duration: "2 דקות",
                purpose: "חימום גמישות עמוד השדרה",
                instructions: [
                  "עמוד על ארבע",
                  "עיגול הגב כלפי מעלה - נשיפה",
                  "קשת הגב כלפי מטה - שאיפה",
                  "8-10 חזרות איטיות"
                ]
              }
            ]
          },
          {
            phase: "יסודות עמידה",
            duration: "8 דקות",
            poses: [
              {
                name: "Tadasana - עמידת הר",
                hebrewName: "תדאסנה",
                duration: "3 דקות",
                purpose: "בניית מודעות ליציבה הבסיסית",
                instructions: [
                  "עמוד זקוף עם כפות הרגליים במקביל",
                  "הפזר את המשקל באופן שווה",
                  "הדק את שרירי הירכיים והרם את פיקת הברכיים",
                  "מתח את עמוד השדרה כלפי מעלה",
                  "נשום עמוק והרגש את ההשתרשות"
                ],
                benefits: ["יציבה נכונה", "חיזוק שרירי ליבה", "מודעות לגוף"],
                alignment: [
                  "קו אחד: קרסול-ברך-ירך",
                  "עקומה טבעית במותניים",
                  "חזה מורם בעדינות",
                  "כתפיים רחוק מהאוזניים"
                ]
              }
            ]
          },
          {
            phase: "רגיעה ואינטגרציה",
            duration: "5 דקות",
            poses: [
              {
                name: "Balasana - עמידת הילד",
                hebrewName: "באלאסנה",
                duration: "2 דקות",
                purpose: "הרגעה ושחרור מתח",
                instructions: [
                  "כרע על ברכיים",
                  "שב על עקבים",
                  "כפף קדימה והנח מצח על רצפה",
                  "זרועות לצדדים, כפות ידיים כלפי מעלה",
                  "נשום עמוק והרגש שחרור"
                ]
              },
              {
                name: "Savasana - תנוחת המת",
                hebrewName: "שוואסנה",
                duration: "3 דקות",
                purpose: "אינטגרציה ושחרור מלא",
                instructions: [
                  "שכב על גב עם רגליים מעט פתוחות",
                  "זרועות לצדדים, כפות ידיים כלפי מעלה",
                  "סגור עיניים והרפה כל חלק בגוף",
                  "נשום טבעי ללא שליטה",
                  "הישאר מודע ורגוע"
                ]
              }
            ]
          }
        ]
      }
    },
    2: {
      title: "שלב 2: בניית בסיס",
      duration: "30 דקות",
      frequency: "3-4 פעמים בשבוע",
      weeks: "שבועות 5-8",
      focus: "פיתוח כוח, גמישות ותנוחות עמידה בסיסיות"
    },
    3: {
      title: "שלב 3: פיתוח והעמקה",
      duration: "45 דקות",
      frequency: "4 פעמים בשבוע",
      weeks: "שבועות 9-16",
      focus: "תנוחות מורכבות, פיתולים וחיזוק מתקדם"
    },
    4: {
      title: "שלב 4: עומק ושלמות",
      duration: "60 דקות",
      frequency: "4-5 פעמים בשבוע",
      weeks: "שבועות 17-24",
      focus: "הפיכות, פיתחי גב מתקדמים ותרגול מושלם"
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

  const SessionView = ({ session }) => (
    <div className="bg-white p-6 rounded-lg shadow-lg" dir="rtl">
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-bold text-blue-800 mb-2">{session.title}</h2>
        <div className="flex justify-center gap-4 mb-4">
          <span className="bg-blue-100 px-4 py-2 rounded-full font-bold text-blue-800">
            {session.totalDuration}
          </span>
          <span className="bg-purple-100 px-4 py-2 rounded-full font-bold text-purple-800">
            {session.theme}
          </span>
        </div>
      </div>

      {session.sequence.map((phase, phaseIdx) => (
        <div key={phaseIdx} className="mb-8 border-r-4 border-blue-500 pr-6">
          <div className="mb-4">
            <h3 className="text-2xl font-bold text-blue-700 mb-2">{phase.phase}</h3>
            <span className="bg-green-100 px-3 py-1 rounded-full text-green-800 font-bold">
              {phase.duration}
            </span>
          </div>

          <div className="space-y-4">
            {phase.poses.map((pose, poseIdx) => (
              <div key={poseIdx} className="bg-gray-50 p-4 rounded-lg border-r-2 border-gray-300">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="text-xl font-bold text-gray-800">{pose.name}</h4>
                    {pose.hebrewName && (
                      <p className="text-sm text-gray-600">{pose.hebrewName}</p>
                    )}
                  </div>
                  <div className="text-left">
                    <span className="bg-yellow-100 px-3 py-1 rounded-full text-yellow-800 text-sm font-bold">
                      {pose.duration}
                    </span>
                  </div>
                </div>

                <div className="mb-3">
                  <h5 className="font-bold text-green-700 mb-1">מטרה:</h5>
                  <p className="text-gray-700 text-sm">{pose.purpose}</p>
                </div>

                <div>
                  <h5 className="font-bold text-blue-700 mb-2">הוראות ביצוע:</h5>
                  <ul className="space-y-1">
                    {pose.instructions.map((instruction, instIdx) => (
                      <li key={instIdx} className="flex gap-3 text-sm">
                        <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                          {instIdx + 1}
                        </span>
                        <span className="text-gray-700">{instruction}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {pose.benefits && (
                  <div className="mt-3">
                    <h5 className="font-bold text-purple-700 mb-1">יתרונות:</h5>
                    <div className="flex flex-wrap gap-2">
                      {pose.benefits.map((benefit, benIdx) => (
                        <span key={benIdx} className="bg-purple-100 px-2 py-1 rounded text-xs text-purple-800">
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {pose.alignment && (
                  <div className="mt-3">
                    <h5 className="font-bold text-orange-700 mb-1">נקודות יישור:</h5>
                    <ul className="text-xs space-y-1">
                      {pose.alignment.map((align, alignIdx) => (
                        <li key={alignIdx} className="flex gap-2">
                          <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-1.5 flex-shrink-0"></span>
                          <span className="text-gray-600">{align}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="mt-8 bg-gradient-to-r from-blue-100 to-purple-100 p-6 rounded-lg">
        <h3 className="text-xl font-bold text-center mb-4">טיימר הסשן</h3>
        <div className="flex items-center justify-center gap-6">
          <div className="text-4xl font-mono bg-white px-6 py-3 rounded-lg border-2">
            {formatTime(timeElapsed)}
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className={`p-3 rounded-lg text-white font-bold text-lg ${
                isTimerRunning ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
              } transition-colors`}
            >
              {isTimerRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </button>
            <button
              onClick={resetTimer}
              className="p-3 rounded-lg bg-gray-500 hover:bg-gray-600 text-white transition-colors"
            >
              <RotateCcw className="w-6 h-6" />
            </button>
          </div>
        </div>
        <p className="text-center mt-4 text-gray-600">
          משך זמן מומלץ: <strong>{session.totalDuration}</strong>
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4" dir="rtl">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-800 mb-2">יוגה איינגר - סשנים הוליסטיים</h1>
          <p className="text-gray-600">תרגול מעגלי ושלם עם היגיון פנימי לכל שלב</p>
        </header>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-center">בחר שלב לתרגול</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(stages).map(([stageNum, stage]) => (
              <button
                key={stageNum}
                onClick={() => {
                  setCurrentStage(parseInt(stageNum));
                  setCurrentSession(null);
                  setSessionInProgress(false);
                }}
                className={`p-4 rounded-lg border-2 transition-all ${
                  currentStage === parseInt(stageNum)
                    ? 'border-blue-500 bg-blue-50 shadow-lg'
                    : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-md'
                }`}
              >
                <h3 className="font-bold text-lg text-blue-800">{stage.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{stage.weeks}</p>
                <p className="text-sm text-gray-600">{stage.duration}</p>
                <p className="text-xs text-purple-600 mt-2 font-medium">{stage.focus}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">{stages[currentStage].title}</h2>
          <div className="grid md:grid-cols-4 gap-4 mb-4">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <h3 className="font-bold text-blue-800">משך זמן</h3>
              <p className="text-blue-600">{stages[currentStage].duration}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <h3 className="font-bold text-green-800">תדירות</h3>
              <p className="text-green-600">{stages[currentStage].frequency}</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <h3 className="font-bold text-purple-800">תקופה</h3>
              <p className="text-purple-600">{stages[currentStage].weeks}</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg text-center">
              <h3 className="font-bold text-orange-800">מיקוד</h3>
              <p className="text-orange-600 text-sm">{stages[currentStage].focus}</p>
            </div>
          </div>
          
          <div className="text-center">
            <button
              onClick={() => {
                if (stages[currentStage].session) {
                  setCurrentSession(stages[currentStage].session);
                  setSessionInProgress(true);
                  resetTimer();
                }
              }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg flex items-center gap-3 mx-auto"
            >
              <PlayCircle className="w-6 h-6" />
              התחל סשן {stages[currentStage].title}
            </button>
          </div>
        </div>

        {currentSession && sessionInProgress && (
          <SessionView session={currentSession} />
        )}

        {!sessionInProgress && (
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">המדריך לתרגול הוליסטי</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-lg mb-3 text-blue-800">מבנה הסשנים:</h3>
                <ul className="space-y-2">
                  <li className="flex gap-3">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                    <span><strong>פתיחה:</strong> מרכוז והכנה מנטלית</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                    <span><strong>חימום:</strong> הכנת הגוף לתרגול</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                    <span><strong>שיא:</strong> התנוחות העיקריות</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
                    <span><strong>סיום:</strong> רגיעה ואינטגרציה</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-3 text-purple-800">עקרונות התרגול:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>התקדם בקצב שלך - אל תמהר</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>נשום עמוק ורגוע בכל תנוחה</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>שמור על מודעות למה שקורה בגוף</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>השתמש בכלי עזר כשנדרש</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>סיים תמיד ברגיעה מלאה</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-green-50 rounded-lg border-2 border-green-200">
              <h3 className="font-bold text-lg text-green-800 mb-2 text-center">✅ האפליקציה מוכנה לתרגול!</h3>
              <p className="text-center text-green-700">
                בחר את השלב המתאים לך והתחל את המסע שלך ביוגה איינגר! 🧘‍♂️
              </p>
            </div>
          </div>
        )}

        <div className="fixed bottom-4 left-4 bg-white p-4 rounded-lg shadow-lg border">
          <h3 className="font-bold text-center mb-2 text-sm">טיימר מהיר</h3>
          <div className="text-2xl font-mono text-center mb-2">{formatTime(timeElapsed)}</div>
          <div className="flex gap-2 justify-center">
            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className={`p-2 rounded ${isTimerRunning ? 'bg-red-500' : 'bg-green-500'} text-white`}
            >
              {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <button
              onClick={resetTimer}
              className="p-2 rounded bg-gray-500 text-white"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IyengarYogaApp;
