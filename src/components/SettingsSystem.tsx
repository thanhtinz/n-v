import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { useGameState } from '@/hooks/useGameState';
import { 
  Settings,
  Download,
  Upload
} from 'lucide-react';

interface SettingsType {
  musicVolume: number;
  soundEffectsVolume: number;
  notificationsEnabled: boolean;
  darkMode: boolean;
}

const SettingsSystem = () => {
  const { gameState, updateGameState, addNotification } = useGameState();
  const [localSettings, setLocalSettings] = useState<SettingsType>(() => {
    const savedSettings = localStorage.getItem('gameSettings');
    return savedSettings ? JSON.parse(savedSettings) : {
      musicVolume: 50,
      soundEffectsVolume: 75,
      notificationsEnabled: true,
      darkMode: false
    };
  });

  const handleSettingChange = (key: keyof SettingsType, value: any) => {
    const newSettings = { ...localSettings, [key]: value };
    setLocalSettings(newSettings);
    localStorage.setItem('gameSettings', JSON.stringify(newSettings));
  };

  const exportData = () => {
    const dataToExport = {
      gameState,
      settings: localSettings,
      timestamp: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(dataToExport, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `game-data-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
    addNotification('Đã xuất dữ liệu thành công!', 'success');
  };

  const importData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target?.result as string);
        
        if (importedData.gameState) {
          updateGameState(importedData.gameState);
        }
        
        if (importedData.settings) {
          setLocalSettings(importedData.settings);
          localStorage.setItem('gameSettings', JSON.stringify(importedData.settings));
        }
        
        addNotification('Đã nhập dữ liệu thành công!', 'success');
      } catch (error) {
        addNotification('Lỗi khi nhập dữ liệu!', 'warning');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-4">
      <Card className="p-4 bg-card/80 backdrop-blur-sm border-border/50">
        <h2 className="text-xl font-semibold text-cultivator-gold mb-4 flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Cài Đặt Hệ Thống
        </h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="musicVolume">Âm lượng nhạc nền</Label>
            <div className="w-48">
              <Slider
                id="musicVolume"
                defaultValue={[localSettings.musicVolume]}
                max={100}
                step={1}
                onValueChange={(value) => handleSettingChange('musicVolume', value[0])}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="soundEffectsVolume">Âm lượng hiệu ứng</Label>
            <div className="w-48">
              <Slider
                id="soundEffectsVolume"
                defaultValue={[localSettings.soundEffectsVolume]}
                max={100}
                step={1}
                onValueChange={(value) => handleSettingChange('soundEffectsVolume', value[0])}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="notificationsEnabled">Thông báo</Label>
            <Checkbox
              id="notificationsEnabled"
              checked={localSettings.notificationsEnabled}
              onCheckedChange={(checked) => handleSettingChange('notificationsEnabled', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="darkMode">Chế độ tối</Label>
            <Checkbox
              id="darkMode"
              checked={localSettings.darkMode}
              onCheckedChange={(checked) => handleSettingChange('darkMode', checked)}
            />
          </div>

          <div className="border-t pt-4">
            <h3 className="text-lg font-semibold mb-2">Dữ Liệu</h3>
            <div className="flex gap-2">
              <Button variant="outline" onClick={exportData}>
                <Download className="w-4 h-4 mr-2" />
                Xuất Dữ Liệu
              </Button>
              
              <Input
                type="file"
                id="importData"
                className="hidden"
                accept=".json"
                onChange={importData}
              />
              <Label htmlFor="importData" className="cursor-pointer">
                <Button variant="outline" asChild>
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Nhập Dữ Liệu
                  </>
                </Button>
              </Label>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SettingsSystem;
