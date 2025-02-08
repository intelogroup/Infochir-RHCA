
import { RhcaArticle } from "../types";
import { volumes2024 } from "./years/2024";
import { volumes2023 } from "./years/2023";
import { volumes2022 } from "./years/2022";
import { volumes2021 } from "./years/2021";

// Flatten all articles from all volumes into a single array
export const mockArticles: RhcaArticle[] = [
  ...volumes2024.flatMap(volume => volume.articles),
  ...volumes2023.flatMap(volume => volume.articles),
  ...volumes2022.flatMap(volume => volume.articles),
  ...volumes2021.flatMap(volume => volume.articles),
  // Include the existing mock articles
  {
    id: "1",
    title: "Nouvelles approches en chirurgie mini-invasive",
    abstract: "Une étude approfondie des techniques modernes en chirurgie mini-invasive...",
    authors: ["Dr. Jean Martin", "Dr. Marie Claire"],
    publicationDate: "2024-03-15",
    date: "2024-03-15",
    specialty: "Chirurgie générale",
    category: "Recherche",
    source: "RHCA",
    volume: "12",
    pageNumber: "23-30",
    views: 245,
    downloads: 78,
    shares: 32,
    citations: 15,
    tags: ["Chirurgie", "Innovation", "Mini-invasive"],
    imageUrl: "/placeholder.svg"
  },
  {
    id: "2",
    title: "Impact des nouvelles technologies en médecine",
    abstract: "Comment l'IA transforme la pratique médicale quotidienne...",
    authors: ["Dr. Pierre Dupont"],
    publicationDate: "2024-02-10",
    date: "2024-02-10",
    specialty: "Innovation",
    category: "Technologie",
    source: "RHCA",
    volume: "12",
    pageNumber: "31-40",
    views: 189,
    downloads: 65,
    shares: 28,
    citations: 12,
    tags: ["IA", "Innovation", "Technologie"],
    imageUrl: "/placeholder.svg"
  },
  {
    id: "3",
    title: "Avancées en anesthésie régionale",
    abstract: "Les dernières innovations en matière d'anesthésie locorégionale...",
    authors: ["Dr. Sophie Bernard"],
    publicationDate: "2023-12-20",
    date: "2023-12-20",
    specialty: "Anesthésie",
    category: "Recherche",
    source: "RHCA",
    volume: "12",
    pageNumber: "41-50",
    views: 210,
    downloads: 72,
    shares: 35,
    citations: 10,
    tags: ["Anesthésie", "Innovation"],
    imageUrl: "/placeholder.svg"
  },
  {
    id: "4",
    title: "Rétrospective 2023 des avancées chirurgicales",
    abstract: "Synthèse des progrès majeurs en chirurgie au cours de l'année...",
    authors: ["Dr. Marie Lambert", "Dr. Jean-Marc Bernard"],
    publicationDate: "2023-12-15",
    date: "2023-12-15",
    specialty: "Chirurgie",
    category: "Rétrospective",
    source: "RHCA",
    volume: "12",
    pageNumber: "51-60",
    views: 245,
    downloads: 86,
    shares: 43,
    citations: 20,
    tags: ["Rétrospective", "Innovation"],
    imageUrl: "/placeholder.svg"
  },
  {
    id: "5",
    title: "Innovations en chirurgie cardiaque",
    abstract: "État de l'art des techniques modernes en chirurgie cardiaque...",
    authors: ["Dr. Pierre Martin", "Dr. Sophie Dubois"],
    publicationDate: "2023-01-15",
    date: "2023-01-15",
    specialty: "Cardiologie",
    category: "Innovation",
    source: "RHCA",
    volume: "1",
    pageNumber: "1-10",
    views: 280,
    downloads: 92,
    shares: 48,
    citations: 25,
    tags: ["Cardiaque", "Innovation"],
    imageUrl: "/placeholder.svg"
  },
  {
    id: "6",
    title: "Techniques avancées en chirurgie pédiatrique",
    abstract: "Nouvelles approches en chirurgie pédiatrique mini-invasive...",
    authors: ["Dr. Claire Martin", "Dr. Paul Robert"],
    publicationDate: "2022-11-15",
    date: "2022-11-15",
    specialty: "Pédiatrie",
    category: "Innovation",
    source: "RHCA",
    volume: "11",
    pageNumber: "1-8",
    views: 230,
    downloads: 82,
    shares: 40,
    citations: 15,
    tags: ["Pédiatrie", "Innovation"],
    imageUrl: "/placeholder.svg"
  }
];
