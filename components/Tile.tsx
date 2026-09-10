'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import styles from './EquipTileStyles.module.css';
import ArrowIcon from './ArrowIcon';
import type { Project } from '@/lib/data';

const placeholderMap: Record<string, string> = {
  turquoise: styles.placeholderTurquoise,
  coral: styles.placeholderCoral,
  green: styles.placeholderGreen,
  sand: styles.placeholderSand,
};

const sizeClassMap: Record<string, string> = {
  normal: '',
  wide: styles['size-wide'],
  tall: styles['size-tall'],
  large: styles['size-large'],
};

export default function Tile({ project }: { project: Project }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch((e) => console.error('Video play failed:', e));
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const hasThumbnail = Boolean(project.thumbnail?.trim());
  const hasVideo = Boolean(project.videoUrl?.trim());

  const imageAlt = `Thumbnail for ${project.title}: ${project.category}`;

  return (
    <a
    
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${styles.tile} ${sizeClassMap[project.size] || ''}`}
      aria-label={`${project.title} — opens in new tab`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.tileMediaWrapper}>
        {hasThumbnail ? (
          <Image
            src={project.thumbnail!}
            alt={imageAlt}
            fill
            className={styles.tileImage}
            sizes="(max-width: 768px) 100vw, 33vw"
            loading="lazy"
          />
        ) : (
          <div
            className={`${styles.placeholder} ${placeholderMap[project.accent] || placeholderMap.turquoise}`}
            aria-hidden="true"
          />
        )}

        {hasVideo && (
          <video
            ref={videoRef}
            src={project.videoUrl}
            muted
            loop
            playsInline
            preload="none"
            className={`${styles.tileVideo} ${isHovering ? styles.videoVisible : ''}`}
            aria-hidden="true"
          />
        )}
      </div>

      <div className={styles.tileSheen} aria-hidden="true" />
      <div className={styles.tileBadge}>{project.platform}</div>
      <div className={styles.tileArrow} aria-hidden="true">
        <ArrowIcon variant="default" className="h-14 w-14" />
      </div>

      <div className={styles.tileOverlay}>
        <div className={styles.tileRule} />
        <div className={styles.tileTitle}>{project.title}</div>
        <div className={styles.tileMeta}>{project.category} · {project.year}</div>
      </div>
    </a>
  );
}