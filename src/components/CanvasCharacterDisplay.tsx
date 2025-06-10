
import { useEffect, useRef, useState } from 'react';

interface Equipment {
  clothing: string;
  weapon: string;
  wings: string;
  pet: string;
  aura: string;
}

interface CanvasCharacterDisplayProps {
  realm: string;
  equipment: Equipment;
  name: string;
  class?: 'thien_kiem' | 'anh_vu' | 'thien_am' | 'loi_tong' | 'huyet_ma' | 'van_mong' | 'huyen_vu' | 'xich_diem';
  isActive?: boolean;
  width?: number;
  height?: number;
}

const CanvasCharacterDisplay = ({ 
  realm, 
  equipment, 
  name, 
  class: characterClass, 
  isActive = false,
  width = 320,
  height = 400
}: CanvasCharacterDisplayProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [particles, setParticles] = useState<Array<{ 
    id: number; 
    x: number; 
    y: number; 
    vx: number; 
    vy: number; 
    life: number; 
    maxLife: number;
    color: string;
  }>>([]);

  const getClassColors = (classType?: string) => {
    switch (classType) {
      case 'thien_kiem':
        return { primary: '#ef4444', secondary: '#f97316', accent: '#dc2626' };
      case 'anh_vu':
        return { primary: '#8b5cf6', secondary: '#3b82f6', accent: '#7c3aed' };
      case 'thien_am':
        return { primary: '#3b82f6', secondary: '#06b6d4', accent: '#2563eb' };
      case 'loi_tong':
        return { primary: '#eab308', secondary: '#f97316', accent: '#ca8a04' };
      case 'huyet_ma':
        return { primary: '#7f1d1d', secondary: '#000000', accent: '#991b1b' };
      case 'van_mong':
        return { primary: '#10b981', secondary: '#059669', accent: '#047857' };
      case 'huyen_vu':
        return { primary: '#6b7280', secondary: '#64748b', accent: '#4b5563' };
      case 'xich_diem':
        return { primary: '#f97316', secondary: '#ef4444', accent: '#ea580c' };
      default:
        return { primary: '#10b981', secondary: '#059669', accent: '#047857' };
    }
  };

  const getRealmGlow = (realm: string) => {
    const realmColors = {
      'Phàm Nhân': '#64748b',
      'Luyện Khí': '#3b82f6',
      'Trúc Cơ': '#8b5cf6',
      'Kim Đan': '#eab308',
      'Nguyên Anh': '#f97316',
      'Hóa Thần': '#ef4444',
      'Độ Kiếp': '#7c3aed',
      'Phi Thăng': '#fbbf24'
    };
    return realmColors[realm as keyof typeof realmColors] || '#64748b';
  };

  const drawCharacter = (ctx: CanvasRenderingContext2D) => {
    const colors = getClassColors(characterClass);
    const realmColor = getRealmGlow(realm);
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Background gradient
    const bgGradient = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, Math.max(width, height)/2);
    bgGradient.addColorStop(0, 'rgba(15, 23, 42, 0.1)');
    bgGradient.addColorStop(1, 'rgba(15, 23, 42, 0.3)');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, height);

    // Character base silhouette
    const centerX = width / 2;
    const baseY = height - 40;
    const charWidth = 80;
    const charHeight = 120;

    // Character body gradient
    const bodyGradient = ctx.createLinearGradient(centerX - charWidth/2, baseY - charHeight, centerX + charWidth/2, baseY);
    bodyGradient.addColorStop(0, colors.primary + '99');
    bodyGradient.addColorStop(1, colors.primary + '33');
    ctx.fillStyle = bodyGradient;
    
    // Draw character silhouette
    ctx.beginPath();
    ctx.ellipse(centerX, baseY, charWidth/2, charHeight/2, 0, 0, Math.PI * 2);
    ctx.fill();

    // Equipment layers
    if (equipment.clothing) {
      const clothingGradient = ctx.createLinearGradient(centerX - 50, baseY - 80, centerX + 50, baseY - 20);
      clothingGradient.addColorStop(0, colors.secondary + 'CC');
      clothingGradient.addColorStop(1, colors.accent + '99');
      ctx.fillStyle = clothingGradient;
      ctx.fillRect(centerX - 40, baseY - 70, 80, 60);
    }

    // Weapon
    if (equipment.weapon) {
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(centerX + 60, baseY - 100);
      ctx.lineTo(centerX + 80, baseY - 20);
      ctx.stroke();
      
      // Weapon glow
      ctx.shadowColor = '#fbbf24';
      ctx.shadowBlur = 10;
      ctx.stroke();
      ctx.shadowBlur = 0;
    }

    // Wings
    if (equipment.wings) {
      const wingGradient = ctx.createRadialGradient(centerX, baseY - 60, 0, centerX, baseY - 60, 60);
      wingGradient.addColorStop(0, colors.secondary + 'AA');
      wingGradient.addColorStop(1, colors.secondary + '33');
      ctx.fillStyle = wingGradient;
      
      // Left wing
      ctx.beginPath();
      ctx.ellipse(centerX - 50, baseY - 60, 30, 50, -0.3, 0, Math.PI * 2);
      ctx.fill();
      
      // Right wing
      ctx.beginPath();
      ctx.ellipse(centerX + 50, baseY - 60, 30, 50, 0.3, 0, Math.PI * 2);
      ctx.fill();
    }

    // Aura effect
    if (equipment.aura || isActive) {
      const auraGradient = ctx.createRadialGradient(centerX, baseY - 60, 0, centerX, baseY - 60, 100);
      auraGradient.addColorStop(0, realmColor + '00');
      auraGradient.addColorStop(0.7, realmColor + '44');
      auraGradient.addColorStop(1, realmColor + '00');
      ctx.fillStyle = auraGradient;
      ctx.fillRect(centerX - 100, baseY - 160, 200, 200);
    }

    // Draw particles
    particles.forEach(particle => {
      const alpha = particle.life / particle.maxLife;
      ctx.fillStyle = particle.color + Math.floor(alpha * 255).toString(16).padStart(2, '0');
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, 2 + alpha * 2, 0, Math.PI * 2);
      ctx.fill();
    });

    // Character info background
    const textBgGradient = ctx.createLinearGradient(0, height - 60, 0, height);
    textBgGradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
    textBgGradient.addColorStop(1, 'rgba(0, 0, 0, 0.7)');
    ctx.fillStyle = textBgGradient;
    ctx.fillRect(0, height - 60, width, 60);

    // Character name
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(name, centerX, height - 35);

    // Realm
    ctx.fillStyle = realmColor;
    ctx.font = '12px sans-serif';
    ctx.fillText(realm, centerX, height - 20);

    // Class name
    if (characterClass) {
      const classNames = {
        'thien_kiem': 'Thiên Kiếm',
        'anh_vu': 'Ảnh Vũ',
        'thien_am': 'Thiên Âm',
        'loi_tong': 'Lôi Tông',
        'huyet_ma': 'Huyết Ma',
        'van_mong': 'Vân Mộng',
        'huyen_vu': 'Huyền Vũ',
        'xich_diem': 'Xích Diệm'
      };
      ctx.fillStyle = '#fbbf24';
      ctx.font = '10px sans-serif';
      ctx.fillText(classNames[characterClass] || '', centerX, height - 5);
    }
  };

  const updateParticles = () => {
    if (!isActive) return;

    setParticles(prev => {
      const updated = prev.map(particle => ({
        ...particle,
        x: particle.x + particle.vx,
        y: particle.y + particle.vy,
        life: particle.life - 1
      })).filter(particle => particle.life > 0);

      // Add new particles
      if (Math.random() < 0.3) {
        const colors = getClassColors(characterClass);
        updated.push({
          id: Date.now(),
          x: width/2 + (Math.random() - 0.5) * 100,
          y: height - 100 + (Math.random() - 0.5) * 50,
          vx: (Math.random() - 0.5) * 2,
          vy: -Math.random() * 3 - 1,
          life: 60,
          maxLife: 60,
          color: Math.random() > 0.5 ? colors.primary : colors.secondary
        });
      }

      return updated.slice(-20); // Keep max 20 particles
    });
  };

  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    updateParticles();
    drawCharacter(ctx);
    
    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = width;
    canvas.height = height;
    
    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [width, height, realm, equipment, name, characterClass, isActive]);

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        className="rounded-xl border border-border/50 bg-card/20"
        style={{ width: '100%', height: 'auto', maxWidth: `${width}px` }}
      />
    </div>
  );
};

export default CanvasCharacterDisplay;
