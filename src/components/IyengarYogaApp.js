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
      focus: "פיתוח כוח, גמישות ותנוחות עמידה בסיסיות",
      session: {
        title: "סשן בסיס - כוח וגמישות",
        totalDuration: "30 דקות",
        theme: "כוח, יציבות ותנוחות עמידה",
        sequence: [
          {
            phase: "פתיחה ומרכוז",
            duration: "4 דקות",
            poses: [
              {
                name: "Sukhasana - ישיבה שקטה",
                hebrewName: "סוקהאסנה",
                duration: "2 דקות",
                purpose: "כיוון הכוונה ומרכוז",
                instructions: [
                  "שב בישיבה נוחה עם עמוד השדרה זקוף",
                  "נשום עמוק 5 נשימות וכוון את המודעות",
                  "הכוון את הכוונה לתרגול של כוח ויציבות"
                ]
              },
              {
                name: "Ujjayi Pranayama - נשימת אוקיינוס",
                hebrewName: "אוג'אי פראנאיאמה",
                duration: "2 דקות",
                purpose: "הכנת מערכת העצבים והנשימה",
                instructions: [
                  "שאף עמוק דרך האף",
                  "צר את גרון באופן עדין",
                  "נשוף לאט עם קול עדין דמוי אוקיינוס",
                  "8-10 נשימות"
                ]
              }
            ]
          },
          {
            phase: "חימום ותנוחות עמידה בסיסיות",
            duration: "12 דקות",
            poses: [
              {
                name: "Virabhadrasana I - לוחם 1",
                hebrewName: "וירבהאדראסנה",
                duration: "3 דקות",
                purpose: "חיזוק רגליים, ירכיים ופתיחת חזה",
                instructions: [
                  "עמוד עם רגליים רחבות",
                  "כוון כף רגל ימין קדימה, שמאל 45 מעלות",
                  "כופף את הברך הקדמית ל-90 מעלות",
                  "הרם זרועות מעל הראש",
                  "החזק 5-8 נשימות לכל צד"
                ],
                benefits: ["חיזוק רגליים", "פתיחת ירכיים", "שיפור יציבה"],
                alignment: [
                  "ברך מעל קרסול - לא מעבר",
                  "ירכיים פונות קדימה",
                  "כתפיים רחוק מהאוזניים"
                ]
              },
              {
                name: "Trikonasana - תנוחת המשולש",
                hebrewName: "טריקונאסנה",
                duration: "3 דקות",
                purpose: "פתיחת צדי הגוף וחיזוק רגליים",
                instructions: [
                  "עמוד עם רגליים רחבות",
                  "פרוש זרועות לצדדים",
                  "הנח יד ימין על הרגל ימין",
                  "הרם יד שמאל לשמיים",
                  "החזק 5 נשימות לכל צד"
                ],
                benefits: ["גמישות עמוד שדרה", "חיזוק ירכיים", "שיפור שיווי משקל"]
              },
              {
                name: "Virabhadrasana II - לוחם 2",
                hebrewName: "וירבהאדראסנה שתיים",
                duration: "3 דקות",
                purpose: "חיזוק ירכיים ופתיחת אגן",
                instructions: [
                  "עמוד עם רגליים רחבות",
                  "כוון רגל ימין קדימה, שמאל 90 מעלות",
                  "כופף ברך ימין ל-90 מעלות",
                  "פרוש זרועות לצדדים בגובה הכתפיים",
                  "הסתכל מעל יד ימין"
                ],
                benefits: ["כוח ירכיים", "פתיחת אגן", "ריכוז"]
              },
              {
                name: "Uttanasana - כיפוף קדימה עמוד",
                hebrewName: "אוטנאסנה",
                duration: "3 דקות",
                purpose: "מתיחת גב ורגליים",
                instructions: [
                  "עמוד עם רגליים צמודות",
                  "כופף קדימה עם גב ישר",
                  "הנח ידיים על הרצפה או על רגליים",
                  "שחרר את הצוואר",
                  "החזק 8-10 נשימות"
                ]
              }
            ]
          },
          {
            phase: "חיזוק ורצפה",
            duration: "8 דקות",
            poses: [
              {
                name: "Setu Bandhasana - גשר",
                hebrewName: "סטו בנדהאסנה",
                duration: "3 דקות",
                purpose: "חיזוק גב, ירכיים ופתיחת חזה",
                instructions: [
                  "שכב על גב עם ברכיים כפופות",
                  "כפות רגליים שטוחות על הרצפה",
                  "הרם את האגן כלפי מעלה",
                  "לחץ כתפיים לרצפה",
                  "החזק 5 נשימות, חזור 3 פעמים"
                ],
                benefits: ["חיזוק גב תחתון", "פתיחת חזה", "חיזוק ירכיים"]
              },
              {
                name: "Navasana - תנוחת הסירה",
                hebrewName: "נוואסנה",
                duration: "3 דקות",
                purpose: "חיזוק שרירי הליבה",
                instructions: [
                  "שב על הרצפה עם ברכיים כפופות",
                  "הרם רגליים עד שוקיים מקבילים לרצפה",
                  "פרוש ידיים קדימה",
                  "שמור על גב ישר",
                  "החזק 5 נשימות, חזור 3 פעמים"
                ],
                benefits: ["חיזוק בטן", "שיפור שיווי משקל", "חיזוק גב"]
              },
              {
                name: "Adho Mukha Svanasana - כלב כלפי מטה",
                hebrewName: "אדהו מוקהה שוואנאסנה",
                duration: "2 דקות",
                purpose: "מתיחת כל הגוף והרגעה",
                instructions: [
                  "עמוד על ארבע",
                  "הרם את הברכיים",
                  "דחוף ידיים לרצפה",
                  "מתח את עמוד השדרה",
                  "רגליים ישרות עד כמה שניתן"
                ]
              }
            ]
          },
          {
            phase: "רגיעה ואינטגרציה",
            duration: "6 דקות",
            poses: [
              {
                name: "Supta Baddha Konasana - פרפר שכיבה",
                hebrewName: "סופטה בדהא קונאסנה",
                duration: "3 דקות",
                purpose: "פתיחת ירכיים ורגיעה",
                instructions: [
                  "שכב על גב",
                  "חבר כפות רגליים זו לזו",
                  "הנח ידיים לצדדים",
                  "הרפה לחלוטין"
                ]
              },
              {
                name: "Savasana - תנוחת המת",
                hebrewName: "שוואסנה",
                duration: "3 דקות",
                purpose: "אינטגרציה ושחרור מלא",
                instructions: [
                  "שכב על גב",
                  "רגליים מעט פתוחות",
                  "ידיים לצדדים, כפות כלפי מעלה",
                  "הרפה כל חלק בגוף",
                  "נשום טבעי ורגוע"
                ]
              }
            ]
          }
        ]
      }
    },
    3: {
      title: "שלב 3: פיתוח והעמקה",
      duration: "45 דקות",
      frequency: "4 פעמים בשבוע",
      weeks: "שבועות 9-16",
      focus: "תנוחות מורכבות, פיתולים וחיזוק מתקדם",
      session: {
        title: "סשן עומק - פיתולים וחיזוק מתקדם",
        totalDuration: "45 דקות",
        theme: "גמישות עמוקה, פיתולים וכוח",
        sequence: [
          {
            phase: "פתיחה ונשימה",
            duration: "5 דקות",
            poses: [
              {
                name: "Padmasana - תנוחת הלוטוס",
                hebrewName: "פדמאסנה",
                duration: "3 דקות",
                purpose: "מרכוז עמוק ופתיחת ירכיים",
                instructions: [
                  "שב עם רגל ימין על ירך שמאל",
                  "אם קשה, השתמש בחצי לוטוס",
                  "ידיים על ברכיים עם אצבע אמה וסנה מחוברות",
                  "עמוד שדרה זקוף, עיניים עצומות"
                ]
              },
              {
                name: "Nadi Shodhana - נשימה מאוזנת",
                hebrewName: "נאדי שודהנה",
                duration: "2 דקות",
                purpose: "איזון מערכת העצבים",
                instructions: [
                  "סגור נחיר ימין עם אגודל",
                  "שאף דרך נחיר שמאל",
                  "סגור שמאל, פתח ימין",
                  "נשוף דרך ימין",
                  "חזור 8 פעמים"
                ]
              }
            ]
          },
          {
            phase: "חימום ועמידה מתקדמת",
            duration: "15 דקות",
            poses: [
              {
                name: "Parivrtta Trikonasana - משולש מסובב",
                hebrewName: "פאריוריטה טריקונאסנה",
                duration: "4 דקות",
                purpose: "פיתול עמוד שדרה ופתיחת חזה",
                instructions: [
                  "עמוד עם רגליים רחבות",
                  "סובב גוף ומקם יד שמאל על רגל ימין",
                  "הרם יד ימין לשמיים",
                  "הסתכל כלפי מעלה",
                  "החזק 5-6 נשימות לכל צד"
                ],
                benefits: ["גמישות עמוד שדרה", "עיסוי איברים פנימיים", "שיפור עיכול"],
                alignment: [
                  "שמור על ירכיים מרובעות",
                  "חזה פתוח לצד",
                  "כתפיים על קו אחד"
                ]
              },
              {
                name: "Ardha Chandrasana - חצי ירח",
                hebrewName: "ארדהה צ'נדראסנה",
                duration: "4 דקות",
                purpose: "שיווי משקל ופתיחת צד",
                instructions: [
                  "עמוד על רגל ימין",
                  "הנח יד ימין על הרצפה קדימה",
                  "הרם רגל שמאל לגובה הירך",
                  "פרוש יד שמאל לשמיים",
                  "הסתכל למעלה"
                ],
                benefits: ["שיווי משקל", "חיזוק רגל עמידה", "פתיחת צד גוף"]
              },
              {
                name: "Parsvottanasana - כיפוף צדי אינטנסיבי",
                hebrewName: "פארשווטנאסנה",
                duration: "4 דקות",
                purpose: "מתיחת גב הרגל וחיזוק",
                instructions: [
                  "עמוד עם רגל ימין קדימה",
                  "חבר ידיים מאחורי הגב (תפילה הפוכה)",
                  "כופף קדימה מהירכיים",
                  "הנח חזה על ירך",
                  "החזק 5 נשימות לכל צד"
                ]
              },
              {
                name: "Utkatasana - כיסא",
                hebrewName: "אוטקטאסנה",
                duration: "3 דקות",
                purpose: "חיזוק ירכיים ושרירי ליבה",
                instructions: [
                  "עמוד עם רגליים צמודות",
                  "כופף ברכיים כאילו יושב על כיסא",
                  "הרם זרועות מעל הראש",
                  "שמור גב ישר",
                  "החזק 8-10 נשימות"
                ]
              }
            ]
          },
          {
            phase: "פיתולים ושכיבה",
            duration: "15 דקות",
            poses: [
              {
                name: "Marichyasana III - פיתול של מאריצ'י",
                hebrewName: "מאריצ'יאסנה שלוש",
                duration: "4 דקות",
                purpose: "פיתול עמוק של עמוד השדרה",
                instructions: [
                  "שב עם רגליים ישרות",
                  "כופף רגל ימין ומקם כף רגל ליד ירך שמאל",
                  "סובב גוף ימינה",
                  "הנח מרפק שמאל על ברך ימין",
                  "הסתכל מאחור"
                ],
                benefits: ["גמישות עמוד שדרה", "עיסוי כבד וכליות", "שיפור עיכול"]
              },
              {
                name: "Supta Padangusthasana - מתיחת רגל שכיבה",
                hebrewName: "סופטה פאדאנגושטהאסנה",
                duration: "4 דקות",
                purpose: "מתיחת גב הרגל ופתיחת ירך",
                instructions: [
                  "שכב על גב",
                  "הרם רגל ימין",
                  "תפוס את האגודל עם יד ימין",
                  "מתח את הרגל מעלה",
                  "החזק 8 נשימות לכל צד"
                ]
              },
              {
                name: "Jathara Parivartanasana - פיתול בטן",
                hebrewName: "ג'טהארה פאריוורטנאסנה",
                duration: "4 דקות",
                purpose: "שחרור עמוד שדרה תחתון",
                instructions: [
                  "שכב על גב",
                  "הרם ברכיים לחזה",
                  "הנח ברכיים לצד ימין",
                  "פרוש ידיים לצדדים",
                  "החזק 6 נשימות לכל צד"
                ]
              },
              {
                name: "Ustrasana - תנוחת הגמל",
                hebrewName: "אוסטראסנה",
                duration: "3 דקות",
                purpose: "פתיחת חזה וגמישות גב",
                instructions: [
                  "כרע על ברכיים",
                  "הרם חזה כלפי מעלה",
                  "הנח ידיים על עקבים",
                  "פתח חזה ושחרר ראש",
                  "החזק 5 נשימות"
                ],
                benefits: ["פתיחת חזה", "גמישות גב", "מתיחת בטן"]
              }
            ]
          },
          {
            phase: "רגיעה עמוקה",
            duration: "10 דקות",
            poses: [
              {
                name: "Viparita Karani - רגליים על הקיר",
                hebrewName: "ויפאריטה קרני",
                duration: "5 דקות",
                purpose: "שחזור ורגיעה מערכתית",
                instructions: [
                  "שכב ליד קיר",
                  "הרם רגליים ישרות על הקיר",
                  "ישבן קרוב לקיר",
                  "ידיים לצדדים",
                  "עצום עיניים ונשום עמוק"
                ],
                benefits: ["הורדת לחץ דם", "מנוחת רגליים", "הרגעת מערכת העצבים"]
              },
              {
                name: "Savasana - תנוחת המת",
                hebrewName: "שוואסנה",
                duration: "5 דקות",
                purpose: "אינטגרציה עמוקה של התרגול",
                instructions: [
                  "שכב על גב בנוחות מלאה",
                  "הנח כרית קטנה תחת הראש אם נדרש",
                  "הרפה כל שריר",
                  "נשום טבעי",
                  "הישאר ב-5 דקות מלאות"
                ]
              }
            ]
          }
        ]
      }
    },
    4: {
      title: "שלב 4: עומק ושלמות",
      duration: "60 דקות",
      frequency: "4-5 פעמים בשבוע",
      weeks: "שבועות 17-24",
      focus: "הפיכות, פיתחי גב מתקדמים ותרגול מושלם",
      session: {
        title: "סשן מתקדם - הפיכות ושלמות",
        totalDuration: "60 דקות",
        theme: "הפיכות, פיתחי גב ותרגול מלא",
        sequence: [
          {
            phase: "פתיחה עמוקה",
            duration: "8 דקות",
            poses: [
              {
                name: "Dhyana - מדיטציה",
                hebrewName: "דיאנה",
                duration: "5 דקות",
                purpose: "כיוון הנפש לתרגול מתקדם",
                instructions: [
                  "שב בלוטוס מלא או חצי לוטוס",
                  "ידיים במודרה של ידע",
                  "עצום עיניים ועקוב אחר הנשימה",
                  "אפשר למחשבות לחלוף מבלי להיאחז",
                  "5 דקות מדיטציה שקטה"
                ]
              },
              {
                name: "Kapalabhati - נשימת אש",
                hebrewName: "קאפאלבהאטי",
                duration: "3 דקות",
                purpose: "הפעלת אנרגיה ועירנות",
                instructions: [
                  "שב זקוף עם עמוד שדרה ישר",
                  "נשיפות מהירות וחזקות דרך האף",
                  "שאיפה פסיבית",
                  "3 סדרות של 30 נשיפות",
                  "מנוחה בין כל סדרה"
                ],
                benefits: ["ניקוי ריאות", "הפעלת אנרגיה", "שיפור ריכוז"]
              }
            ]
          },
          {
            phase: "חימום מתקדם",
            duration: "12 דקות",
            poses: [
              {
                name: "Surya Namaskar - שמש שלום מלא",
                hebrewName: "סוריה נמסקאר",
                duration: "8 דקות",
                purpose: "חימום כל הגוף",
                instructions: [
                  "עמוד ב-Tadasana",
                  "שאף והרם ידיים",
                  "נשוף וכופף קדימה - Uttanasana",
                  "קפוץ לוח - Plank",
                  "נמוך ל-Chaturanga",
                  "הרם קדימה - Urdhva Mukha",
                  "דחוף אחורה - Adho Mukha",
                  "חזור 5 סבבים"
                ],
                benefits: ["חימום כולל", "חיזוק ידיים", "גמישות עמוד שדרה"]
              },
              {
                name: "Virabhadrasana III - לוחם 3",
                hebrewName: "וירבהאדראסנה שלוש",
                duration: "4 דקות",
                purpose: "שיווי משקל וכוח ליבה",
                instructions: [
                  "עמוד על רגל ימין",
                  "הנח גוף מקביל לרצפה",
                  "הרם רגל שמאל לגובה הירך",
                  "פרוש ידיים קדימה",
                  "החזק 8 נשימות לכל צד"
                ]
              }
            ]
          },
          {
            phase: "הפיכות מתקדמות",
            duration: "20 דקות",
            poses: [
              {
                name: "Sirsasana - עמידת ראש",
                hebrewName: "שירשאסנה",
                duration: "7 דקות",
                purpose: "הפיכה מלאה ושיפור זרימת דם",
                instructions: [
                  "כרע ליד קיר",
                  "אחד אצבעות ידיים",
                  "הנח ראש בתוך הידיים",
                  "הרם ישבן ודחוף רגליים כלפי מעלה",
                  "עבוד עם קיר בהתחלה",
                  "החזק 3-5 דקות"
                ],
                benefits: ["שיפור זרימת דם למוח", "חיזוק כתפיים", "שיפור ריכוז"],
                alignment: [
                  "כפות ידיים תומכות בראש",
                  "מרפקים על רוחב הכתפיים",
                  "גוף בקו ישר"
                ]
              },
              {
                name: "Sarvangasana - עמידת כתפיים",
                hebrewName: "סרוואנגאסנה",
                duration: "7 דקות",
                purpose: "הפיכה ואיזון בלוטת התריס",
                instructions: [
                  "שכב על גב",
                  "הרם רגליים מעל הראש",
                  "תמוך בגב עם ידיים",
                  "הרם גוף לאנך",
                  "רגליים ישרות מעל"
                ],
                benefits: ["איזון הורמונלי", "הרגעה", "שיפור מחזור דם"]
              },
              {
                name: "Halasana - תנוחת המחרשה",
                hebrewName: "הלאסנה",
                duration: "6 דקות",
                purpose: "מתיחת גב וצוואר עמוקה",
                instructions: [
                  "מ-Sarvangasana, הורד רגליים מאחורי הראש",
                  "כפות רגליים על הרצפה",
                  "פרוש ידיים על הרצפה",
                  "שמור על גב ישר"
                ],
                benefits: ["גמישות עמוד שדרה", "הרגעה עמוקה", "שחרור מתח"]
              }
            ]
          },
          {
            phase: "פיתחי גב וסיום",
            duration: "15 דקות",
            poses: [
              {
                name: "Urdhva Dhanurasana - גלגל מלא",
                hebrewName: "אורדהווה דהנוראסנה",
                duration: "5 דקות",
                purpose: "פתיחת חזה וגמישות גב מלאה",
                instructions: [
                  "שכב על גב עם ברכיים כפופות",
                  "הנח ידיים ליד האוזניים",
                  "דחוף ועלה לגשר מלא",
                  "פתח חזה ושחרר ראש",
                  "3 חזרות של 5 נשימות"
                ],
                benefits: ["פתיחת חזה מלאה", "גמישות עמוד שדרה", "העלאת אנרגיה"]
              },
              {
                name: "Nadi Shodhana - נשימה מאזנת",
                hebrewName: "נאדי שודהנה",
                duration: "5 דקות",
                purpose: "איזון לאחר תרגול מתקדם",
                instructions: [
                  "שב בנוחות אחרי הפיתוחים",
                  "בצע נשימה אלטרנטיבית",
                  "10 סבבים מלאים",
                  "הרגש את האיזון שב"
                ]
              },
              {
                name: "Savasana - תנוחת המת מלאה",
                hebrewName: "שוואסנה",
                duration: "5 דקות",
                purpose: "אינטגרציה מלאה של תרגול מתקדם",
                instructions: [
                  "שכב עם כרית תחת הראש",
                  "כרית נוספת תחת הברכיים",
                  "עטוף עצמך בשמיכה קלה",
                  "5 דקות מלאות ללא תנועה",
                  "הרגש את האינטגרציה של כל התרגול"
                ],
                benefits: ["אינטגרציה של התרגול", "הורדת לחץ", "חידוש אנרגיה"]
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
