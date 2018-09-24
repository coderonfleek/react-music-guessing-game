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
    artist: "Duncan Mighty ft Reekado",
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
    artist: "DMW",
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
    artist: "Tiwa Savage ft Duncan Mighty",
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
    artist: "Kizz Daniel ft Wizkid",
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
    artist: "DJ Jimmy Jatt ft Wizkid",
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
    artist: "Mystro ft Wizkid",
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
    artist: "Wizkid",
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
    artist: "Tekno ft DJ Cuppy",
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
    artist: "Emmy G ft AB Crazy",
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
    artist: "Burna Boy",
    scoreWeight: 50000
  },
  {
    id: "11",
    order: 11,
    question: "What is the title of the song?",
    level: 3,
    file:
      "http://9jaflaver.com/wp-content/uploads/2018/04/GreyC_Ft_Patoranking_Rude_Boy_9jaflaver.com_.mp3",
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
    answer: "Rude Boy",
    artist: "GreyC ft Patoranking",
    scoreWeight: 100000
  },
  {
    id: "12",
    order: 12,
    question: "What is the title of the song?",
    level: 3,
    file:
      "http://download.toribaze.com/uploads/2018/DJ-Bobbi-X-Nyanda-BrickNLace-Red-Alert-(ToriBaze.com).mp3",
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
    answer: "Red Alert",
    artist: "Nyanda ft DJ Bobby",
    scoreWeight: 100000
  },
  {
    id: "13",
    order: 13,
    question: "What is the title of the song?",
    level: 3,
    file:
      "https://www.naijaonpoint.com/wp-content/uploads/2018/05/Maroon_5_ft_Cardi_B_-_Girls_Like_You-1.mp3",
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
    answer: "Girls Like You",
    artist: "Maroon 5 ft Cardi B",
    scoreWeight: 100000
  },
  {
    id: "14",
    order: 14,
    question: "What is the title of the song?",
    level: 3,
    file:
      "http://naijaloaded.store/wp-content/uploads/2018/04/Patoranking-Suh-Different.mp3",
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
    answer: "Suh Different",
    artist: "Patoranking",
    scoreWeight: 100000
  },
  {
    id: "15",
    order: 15,
    question: "What is the title of the song?",
    level: 3,
    file:
      "http://naijaloaded.store/wp-content/uploads/2018/05/Teni-Askamaya.mp3",
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
    answer: "Askamaya",
    artist: "Teni",
    scoreWeight: 100000
  },
  {
    id: "16",
    order: 16,
    question: "What is the title of the song?",
    level: 4,
    file:
      "http://naijaloaded.store/wp-content/uploads/2018/03/Davido-Ft.-Duncan-Mighty-Peruzzi-Aza.mp3",

    answer: "Aza",
    artist: "Davido ft Duncan Mighty and Peruzzi"
  },
  {
    id: "17",
    order: 17,
    question: "What is the title of the song?",
    level: 4,
    file:
      "http://naijaloaded.store/wp-content/uploads/2018/08/Mayorkun-%E2%80%93-Posh.mp3",

    answer: "Posh",
    artist: "Mayorkun"
  },
  {
    id: "18",
    order: 18,
    question: "What is the title of the song?",
    level: 4,
    file:
      "https://www.naijahits.com/wp-content/uploads/2018/08/Davido-Nwa-Baby.mp3",

    answer: "Nwa Baby",
    artist: "Davido"
  },
  {
    id: "19",
    order: 19,
    question: "What is the title of the song?",
    level: 4,
    file:
      "http://naijaloaded.store/wp-content/uploads/2018/07/DJ-Xclusive-Ft-Duncan-Mighty-Gimme-Love.mp3",

    answer: "Nwa Baby",
    artist: "Davido"
  }
];

export default questions;
