// Safe channel directory (Sanitized metadata only - no stream links or M3U source exposed)
export interface SafeChannel {
  id: string | number;
  num: number;
  name: string;
  category: string;
  logo: string;
  color: string;
}

export const PLAYLIST_CHANNELS: SafeChannel[] = [
  {
    "id": "1",
    "num": 1,
    "name": "Channel One",
    "category": "Local",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/22849?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #164e63, #102338)"
  },
  {
    "id": "2",
    "num": 2,
    "name": "Rupavahini",
    "category": "Local",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/22813?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #285b35, #10251b)"
  },
  {
    "id": "3",
    "num": 3,
    "name": "Nethra TV",
    "category": "Local",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/31371?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #54265e, #21152f)"
  },
  {
    "id": "4",
    "num": 4,
    "name": "ITN",
    "category": "Local",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/22850?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #75431f, #301c17)"
  },
  {
    "id": "5",
    "num": 5,
    "name": "Vasantham TV",
    "category": "Local",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/14298?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #145a70, #152643)"
  },
  {
    "id": "6",
    "num": 6,
    "name": "TV Derana",
    "category": "Local",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/22839?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #782d39, #30151d)"
  },
  {
    "id": "7",
    "num": 7,
    "name": "Swarnawahini",
    "category": "Local",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/22848?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #4d3284, #201c43)"
  },
  {
    "id": "8",
    "num": 8,
    "name": "Sirasa TV",
    "category": "Local",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/11105?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #176b62, #182b3d)"
  },
  {
    "id": "9",
    "num": 9,
    "name": "Shakthi TV",
    "category": "Local",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/22847?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #0f4c5c, #06212b)"
  },
  {
    "id": "10",
    "num": 10,
    "name": "TV1 Sri Lanka",
    "category": "Local",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/11103?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #5c2018, #2a0b06)"
  },
  {
    "id": "11",
    "num": 11,
    "name": "Hiru TV",
    "category": "Local",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/22838?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #164e63, #102338)"
  },
  {
    "id": "12",
    "num": 12,
    "name": "TV Supreme",
    "category": "Local",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/174525?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #285b35, #10251b)"
  },
  {
    "id": "13",
    "num": 13,
    "name": "ART Television",
    "category": "Local",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/23064?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #54265e, #21152f)"
  },
  {
    "id": "14",
    "num": 14,
    "name": "ADA DERANA 24",
    "category": "Local",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/23063?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #75431f, #301c17)"
  },
  {
    "id": "15",
    "num": 15,
    "name": "Siyatha TV",
    "category": "Local",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/22837?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #145a70, #152643)"
  },
  {
    "id": "16",
    "num": 16,
    "name": "Haritha TV",
    "category": "Local",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/22842?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #782d39, #30151d)"
  },
  {
    "id": "17",
    "num": 17,
    "name": "TV Didula",
    "category": "Local",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/22840?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #4d3284, #201c43)"
  },
  {
    "id": "18",
    "num": 18,
    "name": "Ridee TV",
    "category": "Local",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/9590?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #176b62, #182b3d)"
  },
  {
    "id": "19",
    "num": 19,
    "name": "Citi Hitz",
    "category": "Local",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/22841?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #0f4c5c, #06212b)"
  },
  {
    "id": "20",
    "num": 20,
    "name": "ThePapare 3",
    "category": "Sports",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/816294?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #5c2018, #2a0b06)"
  },
  {
    "id": "21",
    "num": 21,
    "name": "Rangiri Sri Lanka",
    "category": "Local",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/22844?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #164e63, #102338)"
  },
  {
    "id": "22",
    "num": 22,
    "name": "Hi TV",
    "category": "Local",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/22845?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #285b35, #10251b)"
  },
  {
    "id": "23",
    "num": 23,
    "name": "Pragna TV",
    "category": "Religious",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/22846?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #54265e, #21152f)"
  },
  {
    "id": "24",
    "num": 24,
    "name": "Damsathara TV",
    "category": "Religious",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/23062?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #75431f, #301c17)"
  },
  {
    "id": "25",
    "num": 25,
    "name": "Jaya TV",
    "category": "Religious",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/20252?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #145a70, #152643)"
  },
  {
    "id": "26",
    "num": 26,
    "name": "Buddhist TV",
    "category": "Religious",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/23082?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #782d39, #30151d)"
  },
  {
    "id": "27",
    "num": 27,
    "name": "Shraddha TV",
    "category": "Religious",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/20253?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #4d3284, #201c43)"
  },
  {
    "id": "28",
    "num": 28,
    "name": "God TV/Swarga TV",
    "category": "Religious",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/23074?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #176b62, #182b3d)"
  },
  {
    "id": "29",
    "num": 29,
    "name": "EWTN / Verbum",
    "category": "Religious",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/23073?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #0f4c5c, #06212b)"
  },
  {
    "id": "30",
    "num": 30,
    "name": "Al Jazeera",
    "category": "News",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/13846?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #5c2018, #2a0b06)"
  },
  {
    "id": "31",
    "num": 31,
    "name": "ABC Australia",
    "category": "News",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/23061?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #164e63, #102338)"
  },
  {
    "id": "32",
    "num": 32,
    "name": "BBC World",
    "category": "News",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/23060?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #285b35, #10251b)"
  },
  {
    "id": "33",
    "num": 33,
    "name": "CGTN",
    "category": "News",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/23059?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #54265e, #21152f)"
  },
  {
    "id": "34",
    "num": 34,
    "name": "CNN",
    "category": "News",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/23069?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #75431f, #301c17)"
  },
  {
    "id": "35",
    "num": 35,
    "name": "NDTV",
    "category": "News",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/23067?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #145a70, #152643)"
  },
  {
    "id": "36",
    "num": 36,
    "name": "France 24x7",
    "category": "News",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/20263?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #782d39, #30151d)"
  },
  {
    "id": "37",
    "num": 37,
    "name": "Euro News",
    "category": "News",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/23057?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #4d3284, #201c43)"
  },
  {
    "id": "38",
    "num": 38,
    "name": "Bloomberg",
    "category": "News",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/23056?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #176b62, #182b3d)"
  },
  {
    "id": "39",
    "num": 39,
    "name": "CNBC",
    "category": "News",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/22803?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #0f4c5c, #06212b)"
  },
  {
    "id": "40",
    "num": 40,
    "name": "B4U Music",
    "category": "Music",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/22790?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #5c2018, #2a0b06)"
  },
  {
    "id": "41",
    "num": 41,
    "name": "Romantico",
    "category": "Music",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/708479?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #164e63, #102338)"
  },
  {
    "id": "42",
    "num": 42,
    "name": "Channel C",
    "category": "Music",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/20268?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #285b35, #10251b)"
  },
  {
    "id": "43",
    "num": 43,
    "name": "Jaya Max",
    "category": "Music",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/185456?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #54265e, #21152f)"
  },
  {
    "id": "44",
    "num": 44,
    "name": "Zing TV",
    "category": "Music",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/175281?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #75431f, #301c17)"
  },
  {
    "id": "45",
    "num": 45,
    "name": "Da Vinci",
    "category": "Kids",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/22800?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #145a70, #152643)"
  },
  {
    "id": "46",
    "num": 46,
    "name": "CBeebies",
    "category": "Kids",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/22795?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #782d39, #30151d)"
  },
  {
    "id": "47",
    "num": 47,
    "name": "Cartoon Network",
    "category": "Kids",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/22794?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #4d3284, #201c43)"
  },
  {
    "id": "48",
    "num": 48,
    "name": "A Plus Kids TV",
    "category": "Kids",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/23054?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #176b62, #182b3d)"
  },
  {
    "id": "49",
    "num": 49,
    "name": "Nickelodeon",
    "category": "Kids",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/13844?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #0f4c5c, #06212b)"
  },
  {
    "id": "50",
    "num": 50,
    "name": "Baby TV",
    "category": "Kids",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/22796?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #5c2018, #2a0b06)"
  },
  {
    "id": "51",
    "num": 51,
    "name": "Disney Jr",
    "category": "Kids",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/23053?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #164e63, #102338)"
  },
  {
    "id": "52",
    "num": 52,
    "name": "Nick JR",
    "category": "Kids",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/13854?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #285b35, #10251b)"
  },
  {
    "id": "53",
    "num": 53,
    "name": "Moonbug",
    "category": "Kids",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/102016?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #54265e, #21152f)"
  },
  {
    "id": "54",
    "num": 54,
    "name": "Pogo",
    "category": "Kids",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/47359?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #75431f, #301c17)"
  },
  {
    "id": "55",
    "num": 55,
    "name": "Animal Planet",
    "category": "Edutainment",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/14185?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #145a70, #152643)"
  },
  {
    "id": "56",
    "num": 56,
    "name": "Discovery",
    "category": "Edutainment",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/23044?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #782d39, #30151d)"
  },
  {
    "id": "57",
    "num": 57,
    "name": "Discovery Science",
    "category": "Edutainment",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/23072?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #4d3284, #201c43)"
  },
  {
    "id": "58",
    "num": 58,
    "name": "TLC",
    "category": "Edutainment",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/22784?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #176b62, #182b3d)"
  },
  {
    "id": "59",
    "num": 59,
    "name": "National Geographic",
    "category": "Edutainment",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/22307?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #0f4c5c, #06212b)"
  },
  {
    "id": "60",
    "num": 60,
    "name": "NGC Wild",
    "category": "Edutainment",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/22814?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #5c2018, #2a0b06)"
  },
  {
    "id": "61",
    "num": 61,
    "name": "History TV 18",
    "category": "Edutainment",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/22810?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #164e63, #102338)"
  },
  {
    "id": "62",
    "num": 62,
    "name": "ThePapare 1",
    "category": "Sports",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/130716?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #285b35, #10251b)"
  },
  {
    "id": "63",
    "num": 63,
    "name": "ThePapare 2",
    "category": "Sports",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/130718?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #54265e, #21152f)"
  },
  {
    "id": "64",
    "num": 64,
    "name": "Sony Sports 1",
    "category": "Sports",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/13860?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #75431f, #301c17)"
  },
  {
    "id": "65",
    "num": 65,
    "name": "Ten Cricket",
    "category": "Sports",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/13862?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #145a70, #152643)"
  },
  {
    "id": "66",
    "num": 66,
    "name": "Sony Sports 2",
    "category": "Sports",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/20280?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #782d39, #30151d)"
  },
  {
    "id": "67",
    "num": 67,
    "name": "Eurosport",
    "category": "Sports",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/698258?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #4d3284, #201c43)"
  },
  {
    "id": "68",
    "num": 68,
    "name": "Star Sports 1",
    "category": "Sports",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/880851?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #176b62, #182b3d)"
  },
  {
    "id": "69",
    "num": 69,
    "name": "Star Sports 2",
    "category": "Sports",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/880853?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #0f4c5c, #06212b)"
  },
  {
    "id": "70",
    "num": 70,
    "name": "Star Sports 3",
    "category": "Sports",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/880855?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #5c2018, #2a0b06)"
  },
  {
    "id": "71",
    "num": 71,
    "name": "HBO Family",
    "category": "Movies",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/22807?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #164e63, #102338)"
  },
  {
    "id": "72",
    "num": 72,
    "name": "&flix",
    "category": "Movies",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/175283?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #285b35, #10251b)"
  },
  {
    "id": "73",
    "num": 73,
    "name": "Hits Movies",
    "category": "Movies",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/23049?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #54265e, #21152f)"
  },
  {
    "id": "74",
    "num": 74,
    "name": "Sony PIX",
    "category": "Movies",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/23076?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #75431f, #301c17)"
  },
  {
    "id": "75",
    "num": 75,
    "name": "HBO Signature",
    "category": "Movies",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/22806?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #145a70, #152643)"
  },
  {
    "id": "76",
    "num": 76,
    "name": "Zee Café",
    "category": "English Entertainment",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/175285?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #782d39, #30151d)"
  },
  {
    "id": "77",
    "num": 77,
    "name": "Warner TV",
    "category": "English Entertainment",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/22783?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #4d3284, #201c43)"
  },
  {
    "id": "78",
    "num": 78,
    "name": "Hits",
    "category": "English Entertainment",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/22815?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #176b62, #182b3d)"
  },
  {
    "id": "79",
    "num": 79,
    "name": "Colors Cineplex",
    "category": "Hindi Entertainment",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/71891?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #0f4c5c, #06212b)"
  },
  {
    "id": "80",
    "num": 80,
    "name": "Fashion TV",
    "category": "English Entertainment",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/13886?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #5c2018, #2a0b06)"
  },
  {
    "id": "81",
    "num": 81,
    "name": "Disney International",
    "category": "English Entertainment",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/174285?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #164e63, #102338)"
  },
  {
    "id": "82",
    "num": 82,
    "name": "Comedy Zone",
    "category": "English Entertainment",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/178287?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #285b35, #10251b)"
  },
  {
    "id": "83",
    "num": 83,
    "name": "BBC Earth",
    "category": "Edutainment",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/23070?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #54265e, #21152f)"
  },
  {
    "id": "84",
    "num": 84,
    "name": "Star Bharath",
    "category": "Hindi Entertainment",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/26109?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #75431f, #301c17)"
  },
  {
    "id": "85",
    "num": 85,
    "name": "Sony Set",
    "category": "Hindi Entertainment",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/23077?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #145a70, #152643)"
  },
  {
    "id": "86",
    "num": 86,
    "name": "SET Max",
    "category": "Hindi Entertainment",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/23075?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #782d39, #30151d)"
  },
  {
    "id": "87",
    "num": 87,
    "name": "Star Gold",
    "category": "Hindi Entertainment",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/23046?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #4d3284, #201c43)"
  },
  {
    "id": "88",
    "num": 88,
    "name": "Colors",
    "category": "Hindi Entertainment",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/22802?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #176b62, #182b3d)"
  },
  {
    "id": "89",
    "num": 89,
    "name": "Star Plus",
    "category": "Hindi Entertainment",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/24174?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #0f4c5c, #06212b)"
  },
  {
    "id": "90",
    "num": 90,
    "name": "B4U Movies",
    "category": "Hindi Entertainment",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/22791?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #5c2018, #2a0b06)"
  },
  {
    "id": "91",
    "num": 91,
    "name": "Star Gold Romance",
    "category": "Hindi Entertainment",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/14250?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #164e63, #102338)"
  },
  {
    "id": "92",
    "num": 92,
    "name": "Zee Cinema",
    "category": "Hindi Entertainment",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/175287?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #285b35, #10251b)"
  },
  {
    "id": "93",
    "num": 93,
    "name": "Colors Tamil",
    "category": "Tamil Entertainment",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/20291?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #54265e, #21152f)"
  },
  {
    "id": "94",
    "num": 94,
    "name": "Jaya Tv",
    "category": "Tamil Entertainment",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/185461?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #75431f, #301c17)"
  },
  {
    "id": "95",
    "num": 95,
    "name": "Jaya Movies",
    "category": "Tamil Entertainment",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/185458?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #145a70, #152643)"
  },
  {
    "id": "96",
    "num": 96,
    "name": "Star Vijay",
    "category": "Tamil Entertainment",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/14258?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #782d39, #30151d)"
  },
  {
    "id": "97",
    "num": 97,
    "name": "Kalaignar TV",
    "category": "Tamil Entertainment",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/20292?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #4d3284, #201c43)"
  },
  {
    "id": "98",
    "num": 98,
    "name": "Zee Tamil",
    "category": "Tamil Entertainment",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/175289?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #176b62, #182b3d)"
  },
  {
    "id": "99",
    "num": 99,
    "name": "Sirippoli TV",
    "category": "Tamil Entertainment",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/25796?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #0f4c5c, #06212b)"
  },
  {
    "id": "100",
    "num": 100,
    "name": "Jaya Plus",
    "category": "News",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/185451?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #5c2018, #2a0b06)"
  },
  {
    "id": "101",
    "num": 101,
    "name": "Zee Thirai",
    "category": "Tamil Entertainment",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/188920?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #164e63, #102338)"
  },
  {
    "id": "102",
    "num": 102,
    "name": "Nenasa Sinhala A/L",
    "category": "Education",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/47369?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #285b35, #10251b)"
  },
  {
    "id": "103",
    "num": 103,
    "name": "Nenasa Sinhala Grade 6-9",
    "category": "Education",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/47365?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #54265e, #21152f)"
  },
  {
    "id": "104",
    "num": 104,
    "name": "Nenasa Tamil A/L",
    "category": "Education",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/47370?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #75431f, #301c17)"
  },
  {
    "id": "105",
    "num": 105,
    "name": "Nenasa Sinhala O/L",
    "category": "Education",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/47367?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #145a70, #152643)"
  },
  {
    "id": "106",
    "num": 106,
    "name": "Nenasa Tamil O/L",
    "category": "Education",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/47368?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #782d39, #30151d)"
  },
  {
    "id": "107",
    "num": 107,
    "name": "HGTV",
    "category": "Edutainment",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/22805?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #4d3284, #201c43)"
  },
  {
    "id": "108",
    "num": 108,
    "name": "Food Network",
    "category": "Edutainment",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/22809?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #176b62, #182b3d)"
  },
  {
    "id": "109",
    "num": 109,
    "name": "Discovery HD",
    "category": "Edutainment",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/23065?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #0f4c5c, #06212b)"
  },
  {
    "id": "110",
    "num": 110,
    "name": "Animal Planet HD",
    "category": "Edutainment",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/14187?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #5c2018, #2a0b06)"
  },
  {
    "id": "111",
    "num": 111,
    "name": "AXN HD",
    "category": "English Entertainment",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/22772?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #164e63, #102338)"
  },
  {
    "id": "112",
    "num": 112,
    "name": "Rock Entertainment",
    "category": "English Entertainment",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/22300?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #285b35, #10251b)"
  },
  {
    "id": "113",
    "num": 113,
    "name": "Hits Now",
    "category": "English Entertainment",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/22305?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #54265e, #21152f)"
  },
  {
    "id": "114",
    "num": 114,
    "name": "HBO",
    "category": "Movies",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/22296?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #75431f, #301c17)"
  },
  {
    "id": "115",
    "num": 115,
    "name": "Star Movies HD",
    "category": "Movies",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/22301?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #145a70, #152643)"
  },
  {
    "id": "116",
    "num": 116,
    "name": "CinemaWorld",
    "category": "Movies",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/22854?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #782d39, #30151d)"
  },
  {
    "id": "117",
    "num": 117,
    "name": "Cinemax",
    "category": "Movies",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/22804?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #4d3284, #201c43)"
  },
  {
    "id": "118",
    "num": 118,
    "name": "HBO Hits",
    "category": "Movies",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/22808?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #176b62, #182b3d)"
  },
  {
    "id": "119",
    "num": 119,
    "name": "Star Movies Select HD",
    "category": "Movies",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/23045?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #0f4c5c, #06212b)"
  },
  {
    "id": "120",
    "num": 120,
    "name": "Star Sports HD 1",
    "category": "Sports",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/880857?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #5c2018, #2a0b06)"
  },
  {
    "id": "121",
    "num": 121,
    "name": "Star Sports Select 1 HD",
    "category": "Sports",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/880859?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #164e63, #102338)"
  },
  {
    "id": "122",
    "num": 122,
    "name": "Star Sports Select 2 HD",
    "category": "Sports",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/880861?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #285b35, #10251b)"
  },
  {
    "id": "123",
    "num": 123,
    "name": "Sony Sports 2 HD",
    "category": "Sports",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/22773?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #54265e, #21152f)"
  },
  {
    "id": "124",
    "num": 124,
    "name": "Sony Sports 5 HD",
    "category": "Sports",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/22297?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #75431f, #301c17)"
  },
  {
    "id": "125",
    "num": 125,
    "name": "Premier Sports HD",
    "category": "Sports",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/22299?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #145a70, #152643)"
  },
  {
    "id": "126",
    "num": 126,
    "name": "ThePapare 1 HD",
    "category": "Sports",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/130720?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #782d39, #30151d)"
  },
  {
    "id": "127",
    "num": 127,
    "name": "ThePapare 2 HD",
    "category": "Sports",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/130722?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #4d3284, #201c43)"
  },
  {
    "id": "130",
    "num": 128,
    "name": "Star Sports 2 HD",
    "category": "Sports",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/880863?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #176b62, #182b3d)"
  },
  {
    "id": "131",
    "num": 129,
    "name": "Discovery Turbo",
    "category": "Edutainment",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/47361?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #0f4c5c, #06212b)"
  },
  {
    "id": "133",
    "num": 130,
    "name": "Rock Action",
    "category": "English Entertainment",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/880865?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #5c2018, #2a0b06)"
  },
  {
    "id": "134",
    "num": 131,
    "name": "Deutsche Welle English",
    "category": "English Entertainment",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/24072?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #164e63, #102338)"
  },
  {
    "id": "135",
    "num": 132,
    "name": "RAI Italia",
    "category": "English Entertainment",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/24069?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #285b35, #10251b)"
  },
  {
    "id": "136",
    "num": 133,
    "name": "TV5 Monde Asie",
    "category": "English Entertainment",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/24070?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #54265e, #21152f)"
  },
  {
    "id": "137",
    "num": 134,
    "name": "TRT World",
    "category": "English Entertainment",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/24071?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #75431f, #301c17)"
  },
  {
    "id": "138",
    "num": 135,
    "name": "Colors Rishty",
    "category": "Hindi Entertainment",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/695417?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #145a70, #152643)"
  },
  {
    "id": "139",
    "num": 136,
    "name": "Phoenix Info News",
    "category": "News",
    "logo": "https://api3.viu.lk/api/client/v1/global/images/24073?accessKey=WkVjNWNscFhORDBLCg==",
    "color": "linear-gradient(135deg, #782d39, #30151d)"
  }
];
