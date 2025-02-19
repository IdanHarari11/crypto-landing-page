import { motion } from 'framer-motion'

export function ChecklistFeatures() {
  const features = [
    {
      title: 'פתיחת תיק',
      description: 'תהליך מהיר, מאובטח ויעיל להתחלת הדרך שלך בעולם הקריפטו.',
    },
    {
      title: 'המרה לכסף קריפטו בהעברה בנקאית',
      description: 'שירות אמין עם עמלות נמוכות ותנאים נוחים.',
    },
    {
      title: 'העברות ללא הגבלה',
      description: 'שליטה מלאה בכספים שלך ללא מגבלות מיותרות.',
    },
    {
      title: 'ניהול תיקים מקצועי',
      description: 'אסטרטגיות מתקדמות להגדלת הרווחים שלך.',
    },
    {
      title: 'ליווי אישי לפתיחת ארנק קריפטו',
      description: 'נוודא שכל שלב מתבצע נכון ובצורה בטוחה.',
    },
  ]

  return (
    <div className="flex flex-col md:flex-row items-center justify-between mt-40 px-8 pb-14 space-y-8 md:space-y-0">
      <div className="relative mr-0 md:mr-18 w-full md:w-1/2 h-80 mb-8 md:mb-0">
        <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute inset-0 w-full h-full rounded-full bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-20"></div>
        <img
          src="/green-white-toggle.jpg"
          alt="Decorative"
          className="absolute inset-0 w-full h-full object-cover rounded-full opacity-80"
        />
      </div>

      <div className="w-full md:w-1/2 pr-0 md:pr-48">
        <ul className="space-y-2 md:space-y-4">
          {features.map((feature, index) => (
            <motion.li
              key={index}
              className="flex flex-col items-start text-lg md:text-xl"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.3 }}
            >
              <div className="flex items-center mb-1">
                <span className="text-primary-green ml-2">✔</span>
                <h3 className="text-lg font-bold">{feature.title}</h3>
              </div>
              <span className="ml-8">{feature.description}</span>
            </motion.li>
          ))}
        </ul>
        <div className="relative mt-4 flex items-center justify-center text-lg font-medium text-gray-700 text-xl font-semibold mt-10">
          <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-green-500 to-teal-500 rounded-full blur-2xl opacity-40 backdrop-blur-lg p-16"></div>
          <div className="absolute inset-0 flex items-center justify-center w-full md:w-3/4 h-[4rem] rounded-full bg-white bg-opacity-20 backdrop-blur-lg border border-white border-opacity-30">
            <div className="relative z-10 text-center">
              💡 שקיפות, אמינות ורווחיות – כל מה שאתה צריך במקום אחד!
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 