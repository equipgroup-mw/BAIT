'use client';

import { useEffect, useRef } from 'react';
import styles from './EquipTileStyles.module.css';
import Tile from './Tile';
import type { Project } from '@/lib/data';

export default function TileGrid({ projects }: { projects: Project[] }) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tiles = gridRef.current?.querySelectorAll(`.${styles.tile}`);
    if (!tiles || !('IntersectionObserver' in window)) {
      tiles?.forEach((el) => el.classList.add(styles.isVisible));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.isVisible);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    tiles.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div ref={gridRef} className={styles.grid}>
      {projects.map((project) => (
        <Tile key={project.slug} project={project} />
      ))}
    </div>
  );
}