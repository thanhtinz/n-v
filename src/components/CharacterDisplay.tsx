
import { useEffect, useState } from 'react';

interface Equipment {
  clothing: string;
  weapon: string;
  wings: string;
  pet: string;
  aura: string;
}

interface CharacterDisplayProps {
  realm: string;
  equipment: Equipment;
  name: string;
  isActive?: boolean;
}

const CharacterDisplay = ({ realm, equipment, name, isActive = false }: CharacterDisplayProps) => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        const newParticle = {
          id: Date.now(),
          x: Math.random() * 100,
          y: Math.random() * 100
        };
        setParticles(prev => [...prev.slice(-5), newParticle]);
      }, 500);
      return () => clearInterval(interval);
    }
  }, [isActive]);

  const getRealmGlow = (realm: string) => {
    const realmGlows = {
      'Phàm Nhân': 'realm-glow-mortal',
      'Luyện Khí': 'realm-glow-qi',
      'Trúc Cơ': 'realm-glow-foundation',
      'Kim Đan': 'realm-glow-golden',
      'Nguyên Anh': 'realm-glow-nascent',
      'Hóa Thần': 'realm-glow-spirit',
      'Độ Kiếp': 'realm-glow-tribulation',
      'Phi Thăng': 'realm-glow-ascension'
    };
    return realmGlows[realm as keyof typeof realmGlows] || 'realm-glow-mortal';
  };

  return (
    <div className="relative">
      <div className={`relative w-full h-full mx-auto bg-gradient-to-b from-card/20 to-card/40 rounded-xl border border-border/50 overflow-hidden ${getRealmGlow(realm)} ${isActive ? 'animate-pulse' : ''}`}>
        {/* Background mystical pattern */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-mystical-purple/10 to-divine-blue/10" />
        
        {/* Spiritual particles */}
        {particles.map(particle => (
          <div
            key={particle.id}
            className="spirit-particle spirit-flow"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}

        {/* Character layers */}
        <div className="character-layer">
          {/* Base character silhouette */}
          <div className="absolute bottom-1 sm:bottom-4 left-1/2 transform -translate-x-1/2 w-24 sm:w-32 h-32 sm:h-48 bg-gradient-to-t from-muted/60 to-muted/20 rounded-full" 
               style={{ clipPath: 'ellipse(40% 48% at 50% 100%)' }} />
          
          {/* Clothing layer */}
          {equipment.clothing && (
            <div className="absolute bottom-2 sm:bottom-8 left-1/2 transform -translate-x-1/2 w-20 sm:w-28 h-28 sm:h-40 bg-gradient-jade rounded-lg opacity-80 equipment-glow" />
          )}
          
          {/* Weapon layer */}
          {equipment.weapon && (
            <div className="absolute bottom-8 sm:bottom-16 right-4 sm:right-8 w-3 sm:w-4 h-20 sm:h-32 bg-cultivator-gold rounded-full transform rotate-45 equipment-glow animate-golden-glow" />
          )}
          
          {/* Wings layer */}
          {equipment.wings && (
            <>
              <div className="absolute top-4 sm:top-8 left-2 sm:left-4 w-8 sm:w-12 h-12 sm:h-20 bg-gradient-purple rounded-full transform -rotate-12 opacity-70" 
                   style={{ clipPath: 'polygon(0% 0%, 100% 30%, 100% 100%, 0% 80%)' }} />
              <div className="absolute top-4 sm:top-8 right-2 sm:right-4 w-8 sm:w-12 h-12 sm:h-20 bg-gradient-purple rounded-full transform rotate-12 opacity-70" 
                   style={{ clipPath: 'polygon(0% 30%, 100% 0%, 100% 80%, 0% 100%)' }} />
            </>
          )}

          {/* Aura effect */}
          {equipment.aura && (
            <div className="absolute inset-1 sm:inset-2 rounded-xl border-2 jade-pulse opacity-50" />
          )}
        </div>

        {/* Character info */}
        <div className="absolute bottom-1 sm:bottom-2 left-1 sm:left-2 right-1 sm:right-2 text-center">
          <div className="text-xs sm:text-sm font-semibold text-foreground">{name}</div>
          <div className="text-xs text-muted-foreground">{realm}</div>
        </div>
      </div>
    </div>
  );
};

export default CharacterDisplay;
