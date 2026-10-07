/**
 * Destresshub - Stress Level Quiz Questions & Metadata
 * 20 questions across 5 categories: Physical, Emotional, Mental, Behavioral, Work-Life
 */

export const SCALE_OPTIONS = [
  { value: 1, label: 'Never' },
  { value: 2, label: 'Rarely' },
  { value: 3, label: 'Sometimes' },
  { value: 4, label: 'Often' },
  { value: 5, label: 'Almost Always' }
]

export const CATEGORIES = {
  physical: {
    id: 'physical',
    name: 'Physical',
    title: 'Physical Wellbeing',
    icon: '⚡',
    maxScore: 25,
    description: 'How stress manifests physically in your body, sleep, and physical energy levels.'
  },
  emotional: {
    id: 'emotional',
    name: 'Emotional',
    title: 'Emotional Resilience',
    icon: '❤️',
    maxScore: 25,
    description: 'Your mood fluctuations, feelings of overwhelm, irritability, and capacity to feel joy.'
  },
  mental: {
    id: 'mental',
    name: 'Mental',
    title: 'Mental Clarity',
    icon: '🧠',
    maxScore: 20,
    description: 'Focus, concentration, memory, decision-making, and persistent worry loops.'
  },
  behavioral: {
    id: 'behavioral',
    name: 'Behavioral',
    title: 'Behavioral Habits',
    icon: '🔄',
    maxScore: 15,
    description: 'Social withdrawal, coping habits, procrastination, and everyday routines.'
  },
  work_life: {
    id: 'work_life',
    name: 'Work-Life',
    title: 'Work-Life Balance',
    icon: '⚖️',
    maxScore: 15,
    description: 'Ability to disconnect, feeling a sense of control, and making space for laughter.'
  }
}

export const QUIZ_QUESTIONS = [
  // PHYSICAL (1 - 5)
  {
    id: 1,
    category: 'physical',
    text: 'I wake up feeling tired, even after a full night in bed.'
  },
  {
    id: 2,
    category: 'physical',
    text: 'I get headaches, neck/shoulder tension, or body aches without a clear physical cause.'
  },
  {
    id: 3,
    category: 'physical',
    text: 'My heart races, or I feel tight in the chest when I think about my to-do list.'
  },
  {
    id: 4,
    category: 'physical',
    text: 'I find it hard to fall asleep or stay asleep because my mind won\'t switch off.'
  },
  {
    id: 5,
    category: 'physical',
    text: 'My appetite has changed: I skip meals, overeat, or crave comfort food more than usual.'
  },

  // EMOTIONAL (6 - 10)
  {
    id: 6,
    category: 'emotional',
    text: 'I feel irritable or snap at people over small things.'
  },
  {
    id: 7,
    category: 'emotional',
    text: 'I feel overwhelmed, like there\'s more to do than I can handle.'
  },
  {
    id: 8,
    category: 'emotional',
    text: 'I feel anxious or on edge for no clear reason.'
  },
  {
    id: 9,
    category: 'emotional',
    text: 'I feel emotionally drained by the end of the day.'
  },
  {
    id: 10,
    category: 'emotional',
    text: 'I find it hard to enjoy things I used to enjoy.'
  },

  // MENTAL (11 - 14)
  {
    id: 11,
    category: 'mental',
    text: 'I have trouble concentrating on one task for long.'
  },
  {
    id: 12,
    category: 'mental',
    text: 'I forget small things: appointments, names, or why I walked into a room.'
  },
  {
    id: 13,
    category: 'mental',
    text: 'My mind keeps replaying worries or "what if" scenarios.'
  },
  {
    id: 14,
    category: 'mental',
    text: 'I find it difficult to make even simple decisions.'
  },

  // BEHAVIORAL (15 - 17)
  {
    id: 15,
    category: 'behavioral',
    text: 'I withdraw from friends, family, or colleagues, even when I don\'t want to be alone.'
  },
  {
    id: 16,
    category: 'behavioral',
    text: 'I rely on caffeine, junk food, scrolling, or other habits to get through the day.'
  },
  {
    id: 17,
    category: 'behavioral',
    text: 'I put off tasks, then feel guilty or more stressed about them.'
  },

  // WORK-LIFE (18 - 20)
  {
    id: 18,
    category: 'work_life',
    text: 'I feel I never get real time to switch off from work or responsibilities.'
  },
  {
    id: 19,
    category: 'work_life',
    text: 'I laugh freely or feel light-hearted less often than I\'d like.'
  },
  {
    id: 20,
    category: 'work_life',
    text: 'I feel I have little control over how my days or responsibilities unfold.'
  }
]

export const CATEGORY_TIPS = {
  physical: [
    {
      title: 'Practice 4-7-8 Diaphragmatic Breathing',
      desc: 'Inhale through your nose for 4 seconds, hold for 7 seconds, and exhale slowly through your mouth for 8 seconds. This activates the vagus nerve and relaxes muscular tension.'
    },
    {
      title: 'Introduce 2-Minute Physical Micro-Breaks',
      desc: 'Every 90 minutes, stand up, roll your shoulders back, stretch your neck, and shake out your wrists to release stored cortisol and physical fatigue.'
    },
    {
      title: 'Establish a 30-Minute Screen Wind-Down',
      desc: 'Swap screens for dim lighting, calming tea, or light stretching before bed to signal your nervous system that it is safe to rest deeply.'
    }
  ],
  emotional: [
    {
      title: 'Name What You Feel Without Judgment',
      desc: 'Simply labeling your emotional state ("I am noticing feeling overwhelmed right now") reduces amygdala reactivity and helps restore emotional equilibrium.'
    },
    {
      title: 'Schedule a Daily 10-Minute Joy Pause',
      desc: 'Spend 10 uninterrupted minutes with something that genuinely lifts your spirits: uplifting music, watching a funny clip, or calling a supportive friend.'
    },
    {
      title: 'Practice Intentional Laughter Therapy',
      desc: 'Take 60 seconds to practice gentle, intentional laughter and deep belly exhalations. Laughter releases endorphins, dispels irritability, and resets emotional tension.'
    }
  ],
  mental: [
    {
      title: 'Do a Nightly "Brain Dump"',
      desc: 'Write down every open loop, task, and worry onto paper before ending your workday. Getting thoughts out of your head stops repetitive "what-if" loops.'
    },
    {
      title: 'Adopt Single-Tasking Intervals',
      desc: 'Pick just one priority and focus on it for 25 minutes with notifications silenced. Mental fatigue often stems from constant micro-interruptions.'
    },
    {
      title: 'The 5-5-5 Worry Filter',
      desc: 'When feeling paralyzed by decisions or worry, ask yourself: Will this matter in 5 days? 5 months? 5 years? Most stressors quickly lose their grip with perspective.'
    }
  ],
  behavioral: [
    {
      title: 'Lower the Barrier to Start (The 2-Minute Rule)',
      desc: 'If procrastination strikes, commit to working on the dreaded task for just 2 minutes. Starting breaks resistance, and momentum usually carries you forward.'
    },
    {
      title: 'Replace Scrolling with a Sensory Reset',
      desc: 'When you feel the urge to scroll mindlessly or seek quick dopamine, step outside for fresh air, drink a cold glass of water, or take 5 conscious breaths.'
    },
    {
      title: 'Reconnect With One Person Today',
      desc: 'Send a quick text or check in with a close friend or colleague. Micro-connections counter isolation and remind your brain that you are supported.'
    }
  ],
  work_life: [
    {
      title: 'Create a Definitive "End of Work" Ritual',
      desc: 'Close work tabs, tidy your desk, and state aloud: "Work is done for today." A tangible boundary helps your brain transition from work mode into recovery mode.'
    },
    {
      title: 'Reclaim 15 Minutes of Protected Unscheduled Time',
      desc: 'Block 15 minutes each day where you have zero obligations, zero to-dos, and complete freedom to do whatever brings you peace or playful joy.'
    },
    {
      title: 'Reintroduce Shared Laughter Into Your Day',
      desc: 'Laughter is the quickest reset button for workplace burnout. Share a humorous moment with a teammate or take part in team laughter wellness.'
    }
  ]
}

export const DISCLAIMER_TEXT =
  'This quiz is for general self-awareness and wellness purposes only. It is not a medical or psychological diagnosis. If you are struggling, please speak to a qualified healthcare professional.'
