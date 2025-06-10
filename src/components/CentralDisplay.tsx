import { useEffect, useState } from 'react';
import CharacterDisplay from './CharacterDisplay';
import CanvasCharacterDisplay from './CanvasCharacterDisplay';

interface Equipment {
  clothing: string;
  weapon: string;
  wings: string;
  pet: string;
  aura: string;
}

interface PlayerCharacter {
  name: string;
  realm: string;
  level: number;
  gender: 'male' | 'female';
  class: 'sword' | 'magic' | 'defense';
  equipment: Equipment;
}

interface CentralDisplayProps {
  player: PlayerCharacter;
  activeTab: string;
  isInCombat?: boolean;
  isInTribulation?: boolean;
  currentSect?: string;
  currentBoss?: { name: string; icon: string } | null;
  currentOpponent?: { name: string; avatar: string } | null;
  homeActivity?: 'gardening' | 'crafting' | 'decorating' | null;
  activeCraftingJobs?: number;
  plantsGrowing?: number;
}

const CentralDisplay = ({ 
  player, 
  activeTab, 
  isInCombat = false, 
  isInTribulation = false,
  currentSect,
  currentBoss,
  currentOpponent,
  homeActivity,
  activeCraftingJobs = 0,
  plantsGrowing = 0
}: CentralDisplayProps) => {
  const [displayMode, setDisplayMode] = useState<'character' | 'combat' | 'tribulation' | 'sect' | 'cultivation' | 'home'>('character');
  const [combatEffects, setCombatEffects] = useState<Array<{ id: number; type: string; x: number; y: number }>>([]);
  const [tribulationClouds, setTribulationClouds] = useState<Array<{ id: number; x: number; y: number; opacity: number }>>([]);

  // Map player class to character class
  const getCharacterClass = (playerClass: 'sword' | 'magic' | 'defense') => {
    switch (playerClass) {
      case 'sword': return 'thien_kiem';
      case 'magic': return 'thien_am';
      case 'defense': return 'huyen_vu';
      default: return 'thien_kiem';
    }
  };

  useEffect(() => {
    // Determine display mode based on active tab and states
    if (isInTribulation) {
      setDisplayMode('tribulation');
    } else if (isInCombat) {
      setDisplayMode('combat');
    } else if (activeTab === 'sect') {
      setDisplayMode('sect');
    } else if (activeTab === 'cultivation') {
      setDisplayMode('cultivation');
    } else if (activeTab === 'home' && homeActivity) {
      setDisplayMode('home');
    } else {
      setDisplayMode('character');
    }
  }, [activeTab, isInCombat, isInTribulation, homeActivity]);

  useEffect(() => {
    if (displayMode === 'combat') {
      const interval = setInterval(() => {
        const newEffect = {
          id: Date.now(),
          type: Math.random() > 0.5 ? 'slash' : 'spark',
          x: Math.random() * 80 + 10,
          y: Math.random() * 80 + 10
        };
        setCombatEffects(prev => [...prev.slice(-3), newEffect]);
      }, 800);
      return () => clearInterval(interval);
    }
  }, [displayMode]);

  useEffect(() => {
    if (displayMode === 'tribulation') {
      const interval = setInterval(() => {
        const newCloud = {
          id: Date.now(),
          x: Math.random() * 60 + 20,
          y: Math.random() * 30 + 10,
          opacity: Math.random() * 0.8 + 0.2
        };
        setTribulationClouds(prev => [...prev.slice(-4), newCloud]);
      }, 1200);
      return () => clearInterval(interval);
    }
  }, [displayMode]);

  const renderCombatDisplay = () => (
    <div className="relative w-full h-full bg-gradient-to-b from-red-900/20 via-orange-800/30 to-red-900/20 rounded-xl border border-blood-red/50 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blood-red/10 to-orange-600/20" />
      
      <div className="absolute inset-0 flex items-end justify-between p-4">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-lg bg-spirit-jade/20 border-2 border-spirit-jade/50 flex items-center justify-center mb-2">
            <div className="w-10 h-10 bg-spirit-jade rounded-full animate-pulse" />
          </div>
          <div className="text-xs font-semibold text-spirit-jade">{player.name}</div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-blood-red font-bold text-xl animate-pulse">VS</div>
        </div>

        <div className="flex flex-col items-center">
          {currentBoss ? (
            <>
              <div className="w-16 h-16 rounded-lg overflow-hidden border-2 border-blood-red/50 mb-2">
                <img
                  src={currentBoss.icon}
                  alt={currentBoss.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <div className="hidden w-full h-full flex items-center justify-center bg-blood-red/20">
                  <div className="w-10 h-10 bg-blood-red rounded-full animate-pulse" />
                </div>
              </div>
              <div className="text-xs font-semibold text-blood-red">{currentBoss.name}</div>
            </>
          ) : currentOpponent ? (
            <>
              <div className="w-16 h-16 rounded-lg overflow-hidden border-2 border-mystical-purple/50 mb-2">
                <img
                  src={currentOpponent.avatar}
                  alt={currentOpponent.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <div className="hidden w-full h-full flex items-center justify-center bg-mystical-purple/20">
                  <div className="w-10 h-10 bg-mystical-purple rounded-full animate-pulse" />
                </div>
              </div>
              <div className="text-xs font-semibold text-mystical-purple">{currentOpponent.name}</div>
            </>
          ) : (
            <>
              <div className="w-16 h-16 rounded-lg bg-blood-red/20 border-2 border-blood-red/50 flex items-center justify-center mb-2">
                <div className="w-10 h-10 bg-blood-red rounded-full animate-pulse" />
              </div>
              <div className="text-xs font-semibold text-blood-red">Đối Thủ</div>
            </>
          )}
        </div>
      </div>

      {combatEffects.map(effect => (
        <div
          key={effect.id}
          className={`absolute w-8 h-8 ${effect.type === 'slash' ? 'bg-red-400' : 'bg-yellow-400'} rounded-full opacity-80 animate-ping`}
          style={{
            left: `${effect.x}%`,
            top: `${effect.y}%`,
            animationDuration: '0.6s'
          }}
        />
      ))}

      <div className="absolute bottom-2 left-2 right-2 text-center">
        <div className="text-sm font-semibold text-blood-red animate-pulse">⚔️ Đang Chiến Đấu</div>
      </div>
    </div>
  );

  const renderTribulationDisplay = () => (
    <div className="relative w-full h-full tribulation-bg rounded-xl border border-mystical-purple/50 overflow-hidden">
      <div className="absolute inset-0">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-full bg-gradient-to-b from-transparent via-yellow-300 to-transparent tribulation-lightning"
            style={{
              left: `${20 + i * 30}%`,
              animationDelay: `${i * 0.3}s`
            }}
          />
        ))}
      </div>

      {tribulationClouds.map(cloud => (
        <div
          key={cloud.id}
          className="absolute w-16 h-8 bg-gray-700 rounded-full tribulation-cloud"
          style={{
            left: `${cloud.x}%`,
            top: `${cloud.y}%`,
            opacity: cloud.opacity
          }}
        />
      ))}

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-48">
        <div className="w-full h-full bg-gradient-to-t from-mystical-purple/60 to-mystical-purple/20 rounded-full lightning-glow" 
             style={{ clipPath: 'ellipse(40% 48% at 50% 100%)' }} />
        <div className="absolute inset-2 rounded-xl border-2 border-spirit-jade animate-pulse" />
      </div>

      <div className="absolute bottom-2 left-2 right-2 text-center">
        <div className="text-sm font-semibold text-mystical-purple animate-pulse">⚡ Độ Kiếp</div>
        <div className="text-xs text-muted-foreground">{player.realm}</div>
      </div>
    </div>
  );

  const renderSectDisplay = () => (
    <div className="relative w-full h-full bg-gradient-to-b from-divine-blue/20 via-spirit-jade/20 to-divine-blue/20 rounded-xl border border-spirit-jade/50 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-24 h-16 bg-gradient-to-b from-spirit-jade/60 to-spirit-jade/40 rounded-t-lg" />
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-32 h-20 bg-gradient-to-b from-spirit-jade/40 to-spirit-jade/20 rounded-lg" />
        <div className="absolute top-16 left-1/4 w-2 h-24 bg-spirit-jade/60 rounded-full" />
        <div className="absolute top-16 right-1/4 w-2 h-24 bg-spirit-jade/60 rounded-full" />
      </div>

      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-spirit-jade rounded-full spirit-flow opacity-60"
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + i * 10}%`,
            animationDelay: `${i * 0.5}s`
          }}
        />
      ))}

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-48">
        <div className="w-full h-full bg-gradient-to-t from-spirit-jade/60 to-spirit-jade/20 rounded-full" 
             style={{ clipPath: 'ellipse(40% 48% at 50% 100%)' }} />
      </div>

      <div className="absolute bottom-2 left-2 right-2 text-center">
        <div className="text-sm font-semibold text-spirit-jade">🏛️ {currentSect || 'Thiên Đạo Tông'}</div>
        <div className="text-xs text-muted-foreground">{player.name}</div>
      </div>
    </div>
  );

  const renderCultivationDisplay = () => (
    <div className="relative w-full h-full bg-gradient-cultivation rounded-xl border border-cultivator-gold/50 overflow-hidden">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute w-4 h-4 bg-cultivator-gold rounded-full cultivate-anim opacity-70"
          style={{
            left: `${15 + (i % 3) * 25}%`,
            top: `${20 + Math.floor(i / 3) * 30}%`,
            animationDelay: `${i * 0.4}s`
          }}
        />
      ))}

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-48">
        <div className="w-full h-full bg-gradient-to-t from-cultivator-gold/60 to-cultivator-gold/20 rounded-full golden-glow" 
             style={{ clipPath: 'ellipse(40% 48% at 50% 100%)' }} />
        <div className="absolute inset-2 rounded-xl border-2 border-cultivator-gold jade-pulse" />
      </div>

      <div className="absolute bottom-2 left-2 right-2 text-center">
        <div className="text-sm font-semibold text-cultivator-gold animate-pulse">🧘 Tu Luyện</div>
        <div className="text-xs text-muted-foreground">Đang hấp thụ thiên địa linh khí</div>
      </div>
    </div>
  );

  const renderHomeDisplay = () => {
    const getActivityDisplay = () => {
      switch (homeActivity) {
        case 'gardening':
          return {
            title: '🌱 Vườn Linh Thảo',
            subtitle: `${plantsGrowing} cây đang phát triển`,
            color: 'text-green-400',
            bgGradient: 'from-green-900/20 via-emerald-800/30 to-green-900/20'
          };
        case 'crafting':
          return {
            title: '🔨 Luyện Đan Phòng',
            subtitle: `${activeCraftingJobs} công việc đang thực hiện`,
            color: 'text-orange-400',
            bgGradient: 'from-orange-900/20 via-amber-800/30 to-orange-900/20'
          };
        case 'decorating':
          return {
            title: '🏮 Trang Trí Động Phủ',
            subtitle: 'Đang sắp xếp trang trí',
            color: 'text-purple-400',
            bgGradient: 'from-purple-900/20 via-violet-800/30 to-purple-900/20'
          };
        default:
          return {
            title: '🏠 Động Phủ',
            subtitle: 'Không gian tu luyện riêng',
            color: 'text-cultivator-gold',
            bgGradient: 'from-yellow-900/20 via-amber-800/30 to-yellow-900/20'
          };
      }
    };

    const activity = getActivityDisplay();

    return (
      <div className={`relative w-full h-full bg-gradient-to-b ${activity.bgGradient} rounded-xl border border-cultivator-gold/50 overflow-hidden`}>
        <div className="absolute inset-0">
          <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-20 h-12 bg-gradient-to-b from-cultivator-gold/60 to-cultivator-gold/40 rounded-t-lg" />
          <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-28 h-16 bg-gradient-to-b from-cultivator-gold/40 to-cultivator-gold/20 rounded-lg" />
          
          <div className="absolute top-20 left-6 w-12 h-12 bg-gradient-to-b from-spirit-jade/40 to-spirit-jade/20 rounded" />
          <div className="absolute top-20 right-6 w-12 h-12 bg-gradient-to-b from-mystical-purple/40 to-mystical-purple/20 rounded" />
        </div>

        {homeActivity === 'gardening' && (
          <>
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="absolute w-3 h-3 bg-green-400 rounded-full opacity-70 animate-bounce"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${60 + (i % 2) * 10}%`,
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: '2s'
                }}
              />
            ))}
          </>
        )}

        {homeActivity === 'crafting' && (
          <>
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-8 bg-orange-400 rounded-full opacity-80"
                style={{
                  left: `${30 + i * 20}%`,
                  top: '40%',
                  animation: `fadeInOut ${1 + i * 0.5}s ease-in-out infinite`
                }}
              />
            ))}
          </>
        )}

        {homeActivity === 'decorating' && (
          <>
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-purple-300 rounded-full opacity-60 animate-pulse"
                style={{
                  left: `${15 + (i % 3) * 25}%`,
                  top: `${25 + Math.floor(i / 3) * 20}%`,
                  animationDelay: `${i * 0.2}s`
                }}
              />
            ))}
          </>
        )}

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-48">
          <div className="w-full h-full bg-gradient-to-t from-cultivator-gold/60 to-cultivator-gold/20 rounded-full" 
               style={{ clipPath: 'ellipse(40% 48% at 50% 100%)' }} />
        </div>

        <div className="absolute bottom-2 left-2 right-2 text-center">
          <div className={`text-sm font-semibold ${activity.color} animate-pulse`}>{activity.title}</div>
          <div className="text-xs text-muted-foreground">{activity.subtitle}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="character-display-mobile sm:w-64 sm:h-80 mx-auto">
      {displayMode === 'combat' && renderCombatDisplay()}
      {displayMode === 'tribulation' && renderTribulationDisplay()}
      {displayMode === 'sect' && renderSectDisplay()}
      {displayMode === 'cultivation' && renderCultivationDisplay()}
      {displayMode === 'home' && renderHomeDisplay()}
      {displayMode === 'character' && (
        <CanvasCharacterDisplay
          realm={player.realm}
          equipment={player.equipment}
          name={player.name}
          class={getCharacterClass(player.class)}
          isActive={activeTab === 'cultivation'}
          width={320}
          height={400}
        />
      )}
    </div>
  );
};

export default CentralDisplay;
