import { useEffect, useState } from 'react';
import CharacterDisplay from './CharacterDisplay';

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
}

const CentralDisplay = ({ 
  player, 
  activeTab, 
  isInCombat = false, 
  isInTribulation = false,
  currentSect,
  currentBoss,
  currentOpponent
}: CentralDisplayProps) => {
  const [displayMode, setDisplayMode] = useState<'character' | 'combat' | 'tribulation' | 'sect' | 'cultivation'>('character');
  const [combatEffects, setCombatEffects] = useState<Array<{ id: number; type: string; x: number; y: number }>>([]);
  const [tribulationClouds, setTribulationClouds] = useState<Array<{ id: number; x: number; y: number; opacity: number }>>([]);

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
    } else {
      setDisplayMode('character');
    }
  }, [activeTab, isInCombat, isInTribulation]);

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
      {/* Combat background */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blood-red/10 to-orange-600/20" />
      
      {/* Combat participants */}
      <div className="absolute inset-0 flex items-end justify-between p-4">
        {/* Player character */}
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-lg bg-spirit-jade/20 border-2 border-spirit-jade/50 flex items-center justify-center mb-2">
            <div className="w-10 h-10 bg-spirit-jade rounded-full animate-pulse" />
          </div>
          <div className="text-xs font-semibold text-spirit-jade">{player.name}</div>
        </div>

        {/* VS indicator */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-blood-red font-bold text-xl animate-pulse">VS</div>
        </div>

        {/* Opponent */}
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

      {/* Combat effects */}
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

      {/* Combat info */}
      <div className="absolute bottom-2 left-2 right-2 text-center">
        <div className="text-sm font-semibold text-blood-red animate-pulse">⚔️ Đang Chiến Đấu</div>
      </div>
    </div>
  );

  const renderTribulationDisplay = () => (
    <div className="relative w-full h-full tribulation-bg rounded-xl border border-mystical-purple/50 overflow-hidden">
      {/* Lightning effects */}
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

      {/* Tribulation clouds */}
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

      {/* Character in tribulation */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-48">
        <div className="w-full h-full bg-gradient-to-t from-mystical-purple/60 to-mystical-purple/20 rounded-full lightning-glow" 
             style={{ clipPath: 'ellipse(40% 48% at 50% 100%)' }} />
        {/* Protective aura */}
        <div className="absolute inset-2 rounded-xl border-2 border-spirit-jade animate-pulse" />
      </div>

      {/* Tribulation info */}
      <div className="absolute bottom-2 left-2 right-2 text-center">
        <div className="text-sm font-semibold text-mystical-purple animate-pulse">⚡ Độ Kiếp</div>
        <div className="text-xs text-muted-foreground">{player.realm}</div>
      </div>
    </div>
  );

  const renderSectDisplay = () => (
    <div className="relative w-full h-full bg-gradient-to-b from-divine-blue/20 via-spirit-jade/20 to-divine-blue/20 rounded-xl border border-spirit-jade/50 overflow-hidden">
      {/* Sect temple background */}
      <div className="absolute inset-0">
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-24 h-16 bg-gradient-to-b from-spirit-jade/60 to-spirit-jade/40 rounded-t-lg" />
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-32 h-20 bg-gradient-to-b from-spirit-jade/40 to-spirit-jade/20 rounded-lg" />
        {/* Pillars */}
        <div className="absolute top-16 left-1/4 w-2 h-24 bg-spirit-jade/60 rounded-full" />
        <div className="absolute top-16 right-1/4 w-2 h-24 bg-spirit-jade/60 rounded-full" />
      </div>

      {/* Floating spiritual energy */}
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

      {/* Character in sect */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-48">
        <div className="w-full h-full bg-gradient-to-t from-spirit-jade/60 to-spirit-jade/20 rounded-full" 
             style={{ clipPath: 'ellipse(40% 48% at 50% 100%)' }} />
      </div>

      {/* Sect info */}
      <div className="absolute bottom-2 left-2 right-2 text-center">
        <div className="text-sm font-semibold text-spirit-jade">🏛️ {currentSect || 'Thiên Đạo Tông'}</div>
        <div className="text-xs text-muted-foreground">{player.name}</div>
      </div>
    </div>
  );

  const renderCultivationDisplay = () => (
    <div className="relative w-full h-full bg-gradient-cultivation rounded-xl border border-cultivator-gold/50 overflow-hidden">
      {/* Cultivation energy swirls */}
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

      {/* Character in meditation */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-48">
        <div className="w-full h-full bg-gradient-to-t from-cultivator-gold/60 to-cultivator-gold/20 rounded-full golden-glow" 
             style={{ clipPath: 'ellipse(40% 48% at 50% 100%)' }} />
        {/* Meditation aura */}
        <div className="absolute inset-2 rounded-xl border-2 border-cultivator-gold jade-pulse" />
      </div>

      {/* Cultivation info */}
      <div className="absolute bottom-2 left-2 right-2 text-center">
        <div className="text-sm font-semibold text-cultivator-gold animate-pulse">🧘 Tu Luyện</div>
        <div className="text-xs text-muted-foreground">Đang hấp thụ thiên địa linh khí</div>
      </div>
    </div>
  );

  return (
    <div className="character-display-mobile sm:w-64 sm:h-80 mx-auto">
      {displayMode === 'combat' && renderCombatDisplay()}
      {displayMode === 'tribulation' && renderTribulationDisplay()}
      {displayMode === 'sect' && renderSectDisplay()}
      {displayMode === 'cultivation' && renderCultivationDisplay()}
      {displayMode === 'character' && (
        <CharacterDisplay
          realm={player.realm}
          equipment={player.equipment}
          name={player.name}
          isActive={activeTab === 'cultivation'}
        />
      )}
    </div>
  );
};

export default CentralDisplay;
