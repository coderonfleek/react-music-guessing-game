const questions = [
  {
    id: "1",
    order: 1,
    question: "What is the title of the song?",
    level: 1,
    file:
      "http://9jaflaver.com/wp-content/uploads/2018/07/Reekado_Banks_Bio_Bio_Ft_Duncan_Mighty_9jaflaver.com_.mp3",
    options: [
      {
        name: "A",
        body: "Amaka"
      },
      {
        name: "B",
        body: "Bio Bio"
      },
      {
        name: "C",
        body: "Wait"
      },
      {
        name: "D",
        body: "Baba"
      }
    ],
    answer: "Bio Bio",
    scoreWeight: 5000
  },
  {
    id: "2",
    order: 2,
    question: "What is the title of the song?",
    level: 1,
    file:
      "http://9jaflaver.com/wp-content/uploads/2018/04/DMW_Aje_Ft_Davido_Peruzzi_Yonda_And_FreshVDM_9jaflaver.com_.mp3",
    options: [
      {
        name: "A",
        body: "Laye"
      },
      {
        name: "B",
        body: "Raba"
      },
      {
        name: "C",
        body: "Aje"
      },
      {
        name: "D",
        body: "Flora My Flower"
      }
    ],
    answer: "Aje",
    scoreWeight: 5000
  },
  {
    id: "3",
    order: 3,
    question: "What is the title of the song?",
    level: 1,
    file:
      "http://9jaflaver.com/wp-content/uploads/2018/08/Tiwa_Savage_Ft_Duncan_Mighty_Lova_Lova_9jaflaver.com_.mp3",
    options: [
      {
        name: "A",
        body: "Lova Lova"
      },
      {
        name: "B",
        body: "Wait"
      },
      {
        name: "C",
        body: "Yolo Yolo"
      },
      {
        name: "D",
        body: "Biko"
      }
    ],
    answer: "Lova Lova",
    scoreWeight: 5000
  },
  {
    id: "4",
    order: 4,
    question: "What is the title of the song?",
    level: 1,
    file:
      "http://9jaflaver.com/wp-content/uploads/2018/06/Kizz_Daniel_Ft_Wizkid_For_You_9jaflaver.com_.mp3",
    options: [
      {
        name: "A",
        body: "Shiga"
      },
      {
        name: "B",
        body: "For You"
      },
      {
        name: "C",
        body: "Feeling the beat"
      },
      {
        name: "D",
        body: "Biko"
      }
    ],
    answer: "For You",
    scoreWeight: 5000
  },
  {
    id: "5",
    order: 5,
    question: "What is the title of the song?",
    level: 1,
    file:
      "http://tooxclusive.com/wp-content/uploads/2015/10/DJ-Jimmy-Jatt-Feeling-The-Beat-ft.-Wizkid_tooxclusive.com_.mp3",
    options: [
      {
        name: "A",
        body: "Rude Boy"
      },
      {
        name: "B",
        body: "Amen"
      },
      {
        name: "C",
        body: "Wavy"
      },
      {
        name: "D",
        body: "Feeling the beat"
      }
    ],
    answer: "Feeling the beat",
    scoreWeight: 5000
  },
  {
    id: "6",
    order: 6,
    question: "What is the title of the song?",
    level: 2,
    file:
      "http://naijaloaded.store/wp-content/uploads/2018/05/Mystro-X-Wizkid-%E2%80%93-Immediately.mp3",
    options: [
      {
        name: "A",
        body: "Rude Boy"
      },
      {
        name: "B",
        body: "Amen"
      },
      {
        name: "C",
        body: "Wavy"
      },
      {
        name: "D",
        body: "Feeling the beat"
      }
    ],
    answer: "Immediately",
    scoreWeight: 50000
  },
  {
    id: "7",
    order: 7,
    question: "What is the title of the song?",
    level: 2,
    file:
      "https://9jaflaver.com/wp-content/uploads/2018/02/Wizkid_Soco_Ft_Ceeza_Milli_Spotless_Terri_9jaflaver.com_.mp3",
    options: [
      {
        name: "A",
        body: "Rude Boy"
      },
      {
        name: "B",
        body: "Amen"
      },
      {
        name: "C",
        body: "Wavy"
      },
      {
        name: "D",
        body: "Feeling the beat"
      }
    ],
    answer: "Soco",
    scoreWeight: 50000
  },
  {
    id: "8",
    order: 8,
    question: "What is the title of the song?",
    level: 2,
    file:
      "https://9jaflaver.com/wp-content/uploads/2017/10/DJ_Cuppy_Ft_Tekno_Green_Light_9jaflaver.com_.mp3",
    options: [
      {
        name: "A",
        body: "Rude Boy"
      },
      {
        name: "B",
        body: "Amen"
      },
      {
        name: "C",
        body: "Wavy"
      },
      {
        name: "D",
        body: "Feeling the beat"
      }
    ],
    answer: "Green Light",
    scoreWeight: 50000
  },
  {
    id: "9",
    order: 9,
    question: "What is the title of the song?",
    level: 2,
    file:
      "http://tooxclusive.com/wp-content/uploads/2013/10/RandsandNairas-Emmy-Gee-ft-Ab-Crazy-Dj-Dimplez.mp3",
    options: [
      {
        name: "A",
        body: "Rude Boy"
      },
      {
        name: "B",
        body: "Amen"
      },
      {
        name: "C",
        body: "Wavy"
      },
      {
        name: "D",
        body: "Feeling the beat"
      }
    ],
    answer: "Rands and Naira",
    scoreWeight: 50000
  },
  {
    id: "10",
    order: 10,
    question: "What is the title of the song?",
    level: 2,
    file: "https://www.jukeboxmusic.com.ng/wp-content/uploads/burna-boy-ye.mp3",
    options: [
      {
        name: "A",
        body: "Rude Boy"
      },
      {
        name: "B",
        body: "Amen"
      },
      {
        name: "C",
        body: "Wavy"
      },
      {
        name: "D",
        body: "Feeling the beat"
      }
    ],
    answer: "Ye",
    scoreWeight: 50000
  }
];

export default questions;
