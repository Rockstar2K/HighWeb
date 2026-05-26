const CDN = 'https://mir-s3-cdn-cf.behance.net/project_modules';

export type BehanceAsset = {
  id: string;
  src: string;
  alt: string;
  projectUrl: string;
  projectName: string;
};

type ProjectDef = {
  id: number;
  name: string;
  url: string;
  images: string[]; // full CDN URLs
};

const PROJECTS: ProjectDef[] = [
  {
    id: 209088035,
    name: 'Hotel Kimal Rebranding',
    url: 'https://www.behance.net/gallery/209088035/Hotel-Kimal-Rebranding',
    images: [
      `${CDN}/1400_webp/4fb89b209088035.66f9d9fe0ec18.png`,
      `${CDN}/1400_webp/0c01c1209088035.66f9d9fe102f1.png`,
      `${CDN}/1400_webp/8be48b209088035.66f9d9fe11390.png`,
      `${CDN}/1400_webp/788806209088035.66f9d9fe11bc0.png`,
      `${CDN}/1400_webp/f3e23b209088035.66f9d9fe1241d.png`,
      `${CDN}/1400_webp/fec234209088035.66f9d9fe134e7.png`,
      `${CDN}/1400_webp/13355f209088035.66f9d9fe13acc.png`,
      `${CDN}/1400_webp/6b1ba2209088035.66f9d9fe0fd46.png`,
    ],
  },
  {
    id: 209087689,
    name: 'Janet Naranjo | Personal Brand',
    url: 'https://www.behance.net/gallery/209087689/Janet-Naranjo-Personal-Brand',
    images: [
      `${CDN}/1400_webp/0d4309209087689.66f9d771974fb.png`,
      `${CDN}/1400_webp/9d022f209087689.66f9d77197a9a.png`,
      `${CDN}/1400_webp/58bb14209087689.66f9d77197fdf.png`,
      `${CDN}/1400_webp/545002209087689.66f9d771987c1.png`,
      `${CDN}/1400_webp/63d592209087689.66f9d77198f83.png`,
      `${CDN}/1400_webp/607f71209087689.66f9d77199529.png`,
    ],
  },
  {
    id: 209082931,
    name: 'Swing Pizzas',
    url: 'https://www.behance.net/gallery/209082931/Swing-Pizzas',
    images: [
      `${CDN}/hd_webp/4bafc5209082931.66f9b985c727e.png`,
      `${CDN}/1400_webp/7672a1209082931.66f9b985c78aa.png`,
      `${CDN}/hd_webp/2aec5b209082931.66f9b985c7d86.png`,
      `${CDN}/hd_webp/ff73f3209082931.66f9b985c8213.png`,
      `${CDN}/hd_webp/2276ee209082931.66f9b985c8a34.png`,
      `${CDN}/hd_webp/49e4c5209082931.66f9b985c91ae.png`,
      `${CDN}/hd_webp/c471f0209082931.66f9b985c9981.png`,
      `${CDN}/hd_webp/5b07fa209082931.66f9b985ca166.png`,
      `${CDN}/1400_webp/8db344209082931.66f9b985ca9f0.png`,
    ],
  },
  {
    id: 209075645,
    name: 'Relativistic Records',
    url: 'https://www.behance.net/gallery/209075645/Relativistic-Records',
    images: [
      `${CDN}/1400_webp/29c907209075645.66f996fd2a424.png`,
      `${CDN}/1400_webp/2b68b3209075645.66f996fd2ab8e.png`,
      `${CDN}/1400_webp/49c68e209075645.66f996fd2b077.png`,
      `${CDN}/1400_webp/a4daca209075645.66f996fd2b4f0.png`,
      `${CDN}/1400_webp/83fdf0209075645.66f996fd2b966.png`,
      `${CDN}/1400_webp/33cb2a209075645.66f996fd2c02d.png`,
      `${CDN}/1400_webp/cd128e209075645.66f996fd2c4a6.png`,
      `${CDN}/1400_webp/f91b9b209075645.66f996fd2cb80.png`,
      `${CDN}/1400_webp/83ac97209075645.66f996fd2da21.png`,
      `${CDN}/1400_webp/c67a1c209075645.66f996fd2df1a.png`,
      `${CDN}/1400_webp/6fbc64209075645.66f996fd2e602.png`,
      `${CDN}/1400_webp/4ded75209075645.66f996fd2ed33.png`,
      `${CDN}/1400_webp/5c31ce209075645.66f996fd2f6b1.png`,
      `${CDN}/1400_webp/287d3b209075645.66f996fd2f22e.png`,
      `${CDN}/1400_webp/f27b1b209075645.66f996fd2fd78.png`,
      `${CDN}/1400_webp/263348209075645.66f996fd3043a.png`,
      `${CDN}/1400_webp/86e57d209075645.66f996fd30c21.png`,
      `${CDN}/1400_webp/f2e218209075645.66f996fd31325.png`,
      `${CDN}/1400_webp/7ae4f4209075645.66f996fd319ef.png`,
      `${CDN}/1400_webp/a0df82209075645.66f996fd320b7.png`,
      `${CDN}/1400_webp/c150e5209075645.66f996fd32a0d.png`,
      `${CDN}/1400_webp/a93f9e209075645.66f996fd33386.png`,
    ],
  },
  {
    id: 209073881,
    name: 'Foresta by Romina Piccoli',
    url: 'https://www.behance.net/gallery/209073881/Foresta-by-Romina-Piccoli',
    images: [
      `${CDN}/1400_webp/8c18cb209073881.66f99060ee3fd.png`,
      `${CDN}/1400_webp/261ee7209073881.66f99060efba7.png`,
      `${CDN}/1400_webp/f33b2d209073881.66f99060f0078.png`,
      `${CDN}/1400_webp/fb2118209073881.66f99060f0869.png`,
      `${CDN}/1400_webp/09dd7a209073881.66f99060f0d9b.png`,
      `${CDN}/1400_webp/6ef4d1209073881.66f99060f1680.png`,
      `${CDN}/1400_webp/53498c209073881.66f99060f1bd4.png`,
      `${CDN}/1400_webp/01fa72209073881.66f99060f21a4.png`,
      `${CDN}/1400_webp/18b317209073881.66f99060f2ac7.png`,
      `${CDN}/1400_webp/738184209073881.66f99060f306f.png`,
      `${CDN}/1400_webp/34f2cc209073881.66f99060f3bde.png`,
      `${CDN}/1400_webp/dc8617209073881.66f99060f3638.png`,
      `${CDN}/max_1200_webp/c2f16a209073881.66f99397a9e7f.png`,
      `${CDN}/max_1200_webp/45399a209073881.66f99397aa3ee.png`,
      `${CDN}/max_1200_webp/ae619a209073881.66f99397ab148.png`,
      `${CDN}/max_1200_webp/3c1a41209073881.66f99397ac0fe.png`,
      `${CDN}/max_1200_webp/5c97c9209073881.66f99397ac8c2.png`,
      `${CDN}/max_1200_webp/e18880209073881.66f99397adf94.png`,
      `${CDN}/max_1200_webp/249d53209073881.66f99397ae73c.png`,
      `${CDN}/max_1200_webp/55d8fa209073881.66f99397aec5a.png`,
      `${CDN}/max_1200_webp/4d013a209073881.66f99397af443.png`,
      `${CDN}/max_1200_webp/b4fa61209073881.66f99397afcc9.png`,
      `${CDN}/max_1200_webp/d06f84209073881.66f99397b01a0.png`,
      `${CDN}/max_1200_webp/6ae68d209073881.66f99397b061d.png`,
      `${CDN}/max_1200_webp/cec1f0209073881.66f99397b288a.png`,
      `${CDN}/max_1200_webp/56bda6209073881.66f99397b238e.png`,
      `${CDN}/max_1200_webp/be96cd209073881.66f99397b173c.png`,
      `${CDN}/max_1200_webp/ddf5e7209073881.66f99397b1eff.png`,
      `${CDN}/max_1200_webp/e058fa209073881.66f99397b2ceb.png`,
      `${CDN}/max_1200_webp/d6f348209073881.66f99397b351d.png`,
      `${CDN}/max_1200_webp/85e8e3209073881.66f99397b3a1f.png`,
      `${CDN}/max_1200_webp/0bc27a209073881.66f99397b42a3.png`,
      `${CDN}/max_1200_webp/09958d209073881.66f99397b4a77.png`,
    ],
  },
  {
    id: 205028495,
    name: 'Evoka Complete Branding Process',
    url: 'https://www.behance.net/gallery/205028495/Evoka-Complete-Branding-Process',
    images: [
      `${CDN}/1400_webp/8d4779205028495.66b39f16573d1.png`,
      `${CDN}/1400_webp/b0c26a205028495.66b39f1657d8c.png`,
    ],
  },
  {
    id: 204942547,
    name: 'Recupera Branding Project',
    url: 'https://www.behance.net/gallery/204942547/Recupera-Branding-Project',
    images: [
      `${CDN}/max_1200_webp/ce7f58204942547.66b22be570901.png`,
      `${CDN}/1400_webp/900198204942547.66b22be56f7ad.png`,
      `${CDN}/1400_webp/3a7e7e204942547.66b22be57132b.png`,
      `${CDN}/1400_webp/b0cf4e204942547.66b22be573171.png`,
      `${CDN}/1400_webp/a38db2204942547.66b22be573a13.png`,
      `${CDN}/1400_webp/48644e204942547.66b22be5741bc.png`,
      `${CDN}/1400_webp/260c2d204942547.66b22be574ac1.png`,
      `${CDN}/1400_webp/6b60ed204942547.66b22be5752f1.png`,
      `${CDN}/1400_webp/910741204942547.66b22be575811.png`,
      `${CDN}/max_1200_webp/49b1d1204942547.66b22be57290e.png`,
    ],
  },
  {
    id: 204820493,
    name: 'Loyers Brand Creation Process',
    url: 'https://www.behance.net/gallery/204820493/Loyers-Brand-Creation-Process',
    images: [
      `${CDN}/1400_webp/122910204820493.66b040f299632.png`,
      `${CDN}/1400_webp/a83a9e204820493.66b040f299e96.png`,
      `${CDN}/1400_webp/e6ea85204820493.66b040f29a70d.png`,
      `${CDN}/max_1200_webp/a71b49204820493.66b0e43749085.png`,
      `${CDN}/1400_webp/2aa0ee204820493.66b0e43749af9.png`,
      `${CDN}/max_632_webp/6f6836204820493.66b1086a88be4.png`,
    ],
  },
  {
    id: 204819771,
    name: 'Florida Y Tú',
    url: 'https://www.behance.net/gallery/204819771/Florida-Y-Tu',
    images: [
      `${CDN}/1400_webp/e52aa9204819771.66b033d5e0cd9.png`,
    ],
  },
  {
    id: 128226997,
    name: 'Nativa',
    url: 'https://www.behance.net/gallery/128226997/Nativa',
    images: [
      `${CDN}/max_632_webp/664785128226997.61521c253159f.png`,
      `${CDN}/max_632_webp/f419b9128226997.61521c2530e76.png`,
      `${CDN}/1400_webp/2d0cfc128226997.63f7d22aa5221.png`,
      `${CDN}/1400_webp/b83922128226997.63f7d2a10d5e4.png`,
      `${CDN}/1400_webp/12f6f7128226997.63f7d2a10c7e5.png`,
      `${CDN}/1400_webp/db7f2d128226997.63f7d2a10f392.png`,
      `${CDN}/1400_webp/c736df128226997.63f7d2a1102ff.png`,
      `${CDN}/max_1200/31486e128226997.63fa5d107d295.gif`,
      `${CDN}/max_1200/b8e374128226997.63fa5d107e3e1.gif`,
    ],
  },
  {
    id: 164479665,
    name: 'Ayro Solar Robotics | Brand Design',
    url: 'https://www.behance.net/gallery/164479665/Ayro-Solar-Robotics-Brand-Design',
    images: [
      `${CDN}/max_1200_webp/21a382164479665.63f75e6f7c0fb.png`,
      `${CDN}/max_1200_webp/771517164479665.63f75f45dae6a.png`,
      `${CDN}/1400_webp/d2aa9c164479665.63fa67333e775.png`,
      `${CDN}/max_1200_webp/053267164479665.63fa67333f799.png`,
      `${CDN}/max_1200_webp/e6c7d6164479665.63fa920baf307.png`,
      `${CDN}/1400_webp/d42c8f164479665.63fa920baffa1.png`,
    ],
  },
];

/** Flat list of every scraped asset, one entry per image */
export const ALL_BEHANCE_ASSETS: BehanceAsset[] = PROJECTS.flatMap((project) =>
  project.images.map((src, i) => ({
    id: `${project.id}-${i}`,
    src,
    alt: project.name,
    projectUrl: project.url,
    projectName: project.name,
  })),
);

/** Seeded shuffle so order is stable across renders but different from sort order */
export function shuffleAssets(assets: BehanceAsset[]): BehanceAsset[] {
  return [...assets]
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
}
