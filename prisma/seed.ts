import "dotenv/config";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import { PrismaClient } from "../lib/generated/prisma/client";

const url = process.env.DATABASE_URL ?? "file:./dev.db";
const adapter = new PrismaLibSql({ url });
const prisma = new PrismaClient({ adapter });

async function main() {
  // Seed experiences from education_client_data.json
  const experiences = [
    {
      id: "devhub",
      position: "Core Developer",
      company: "NEAR DevHub",
      startedYear: 2024,
      timeline: "May 2024 - Present",
      type: "Product",
      description:
        "Created near-api-rs - Rust library for NEAR RPC with multiple signing methods and hardware wallet support. Core developer of NEARN - gig marketplace that became main tool for NEAR hackathons and grants. Backend/smart contracts for Race-of-Sloths - gamified open-source contributions platform",
      url: "/md/devhub.md",
      website: "https://devhub.near.page/",
      imageUrl:
        "https://i.near.social/magic/large/https://near.social/magic/img/account/devhub.near",
      tags: "#Rust #NEAR #TypeScript #NextJS #Tokio #SmartContracts #Prometheus #Grafana #JSONRPC #n8n #GitHubAPI",
    },
    {
      id: "ndc",
      position: "Senior Rust Engineer",
      company: "NEAR NDC",
      startedYear: 2024,
      endedYear: 2024,
      timeline: "Feb 2024 - May 2024",
      type: "DAO",
      description:
        "Architected and implemented a private stake-weighted voting solution for DAO elections. Enhanced voting security through integration with Secret Network for confidential ballot handling",
      url: "/md/ndc.md",
      website: "https://github.com/near-ndc",
      imageUrl:
        "https://avatars.githubusercontent.com/u/115423001?s=200&v=4",
      tags: "#Rust #NEAR #SecretNetwork #CosmWasm #Plonky2 #Gnark #Groth16 #Go #ZKProofs #DAO",
    },
    {
      id: "ggx",
      position: "Protocol Engineer",
      company: "GGx",
      startedYear: 2022,
      endedYear: 2024,
      timeline: "Nov 2022 - Mar 2024",
      type: "Product company",
      description:
        "Core protocol engineer responsible for foundational chain development. Implemented cross-chain communication via ETH relayer, designed iterative merkle proof system, and developed custom substrate pallets",
      url: "/md/ggx.md",
      website: "https://ggxchain.io",
      imageUrl:
        "https://avatars.githubusercontent.com/u/123019201?s=200&v=4",
      tags: "#Rust #Substrate #IBC #Ethereum #ZKSNARKs #Nix #MerkleProofs #Blockchain #ProtocolDesign",
    },
    {
      id: "boosty",
      position: "Senior Rust Developer",
      company: "Casper Network Projects",
      via: "BoostyLabs",
      startedYear: 2022,
      endedYear: 2022,
      timeline: "Jul 2022 - Nov 2022",
      type: "Contract",
      description:
        "Developed cross-chain bridge connecting EVM/non-EVM chains (Tricorn). Built NFT/token contracts for football metaverse game (Ultimate Division). Smart contracts audited by Hallborn and Casper Network.",
      url: "/md/casper.md",
      website: "https://casper.network/",
      imageUrl:
        "https://pbs.twimg.com/profile_images/1633427495344037888/Je6X_nSN_400x400.png",
      tags: "#Rust #CasperNetwork #SmartContracts #NFT #CrossChain #ERC20 #Solidity #Ethereum #Avalanche",
    },
    {
      id: "epam",
      position: "Senior C++ Engineer",
      company: "Refinitiv",
      via: "EPAM Systems",
      startedYear: 2021,
      endedYear: 2022,
      timeline: "Jan 2021 - Jul 2022",
      type: "Outsource company EPAM",
      description:
        "Maintained Thomson one back-end as part of the Value-Added Services team. Real-time data distribution system for financial markets.",
      url: "/md/epam.md",
      website: "https://www.refinitiv.com",
      imageUrl:
        "https://installt1.lseg.com/download/smartonefulldeploy/install/img/lsegone.svg",
      tags: "#C++ #RealTimeData #Jenkins #CI/CD #Support #Automation #SunOS #Optimization",
    },
    {
      id: "intellias",
      position: "Junior/Middle Engineer",
      company: "Here Technologies",
      via: "Intellias",
      startedYear: 2019,
      endedYear: 2021,
      timeline: "Sep 2019 - Jan 2021",
      type: "Outsource company Intellias",
      description:
        "Worked on mobile SDK components for mapping and routing services. Worked on integration of the new map format into routing engine. Leader of the map-making industry.",
      url: "/md/intellias.md",
      website: "https://here.com",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/HERE_logo.svg/90px-HERE_logo.svg.png",
      tags: "#C++ #Mobile #Android #SDK #Navigation #Routing #Algorithms #Performance #Optimization #Jenkins",
    },
  ];

  for (const exp of experiences) {
    await prisma.experience.upsert({
      where: { id: exp.id },
      update: exp,
      create: exp,
    });
  }

  // Seed timeline entries from timeline_data.json
  const timelineEntries = [
    {
      year: "2024",
      title: "NEAR Explorer",
      description: "Embarked on a NEAR journey, crafting the DevHub dreams",
      icon: "🚀",
      order: 0,
    },
    {
      year: "2023",
      title: "Graduation",
      description: "Snagged my degree from KPI, leveling up in binary arts",
      icon: "🎓",
      order: 1,
    },
    {
      year: "2023",
      title: "Whitepaper Wizard",
      description: "Co-authored blockchain whitepaper for GGx",
      icon: "📄",
      order: 2,
    },
    {
      year: "2022",
      title: "Crypto Crusader",
      description: "Fell down the crypto rabbit hole and decided to stay",
      icon: "⛓️",
      order: 3,
    },
    {
      year: "2022",
      title: "Rusty Pokemon is summoned",
      description: "Said 'C-ya later' to C++ and embraced the Rust-y side",
      icon: "🦀",
      order: 4,
    },
    {
      year: "2019",
      title: "Career Kickoff",
      description: "First job: Digital cartographer at Here Technologies",
      icon: "🗺️",
      order: 5,
    },
    {
      year: "2018",
      title: "Code Bootcamp",
      description: "Joined the coding dojo at École 42, no spoons required",
      icon: "🥋",
      order: 6,
    },
  ];

  await prisma.timelineEntry.deleteMany();
  await prisma.timelineEntry.createMany({ data: timelineEntries });

  // Seed technologies from technologies.json
  const technologies = [
    {
      title: "Rust exp",
      src: "/icons/rust.svg",
      description: "NEAR-Devhub, GGx, NDC, Tricorn, Ultimate Division",
    },
    {
      title: "TypeScript exp",
      src: "/icons/typescript.svg",
      description: "NEARN, Race of Sloths",
    },
    {
      title: "C++ Exp",
      src: "/icons/cplusplus.svg",
      description: "Here & Refinitiv contractor",
    },
    {
      title: "Blockchain exp",
      src: "/icons/blockchain.svg",
      description:
        "GGx, Substrate, Casper, NEAR, Secret Network, Ethereum, Cosmos",
    },
  ];

  await prisma.technology.deleteMany();
  await prisma.technology.createMany({ data: technologies });

  console.log("Database seeded successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
