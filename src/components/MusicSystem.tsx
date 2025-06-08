
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useGameState } from '@/hooks/useGameState';
import { 
  Music,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Search,
  Plus,
  Heart,
  Shuffle,
  Repeat,
  ListMusic,
  ExternalLink
} from 'lucide-react';

const MusicSystem = () => {
  const { addNotification } = useGameState();
  const [isConnected, setIsConnected] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [volume, setVolume] = useState(75);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(30);

  // Mock data
  const mockPlaylists = [
    { id: 1, name: 'Tu Luyện Tĩnh Tâm', songs: 25, image: '🧘‍♂️' },
    { id: 2, name: 'Chiến Đấu Hào Hùng', songs: 18, image: '⚔️' },
    { id: 3, name: 'Thiên Nhiên Linh Khí', songs: 32, image: '🌸' },
    { id: 4, name: 'Epic Orchestral', songs: 42, image: '🎼' }
  ];

  const mockSongs = [
    { id: 1, title: 'Ancient Meditation', artist: 'Zen Masters', duration: '4:23', popularity: 95 },
    { id: 2, title: 'Sword Dance', artist: 'Epic Warriors', duration: '3:45', popularity: 88 },
    { id: 3, title: 'Mountain Breeze', artist: 'Nature Sounds', duration: '5:12', popularity: 92 },
    { id: 4, title: 'Dragon Flight', artist: 'Fantasy Orchestra', duration: '6:30', popularity: 90 }
  ];

  const connectSpotify = () => {
    addNotification('Đang kết nối với Spotify...', 'info');
    setTimeout(() => {
      setIsConnected(true);
      addNotification('Đã kết nối thành công với Spotify!', 'success');
    }, 2000);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (!currentSong) {
      setCurrentSong(mockSongs[0]);
    }
  };

  if (!isConnected) {
    return (
      <div className="space-y-4">
        <Card className="p-6 bg-card/80 backdrop-blur-sm border-border/50 text-center">
          <Music className="w-16 h-16 mx-auto mb-4 text-green-500" />
          <h2 className="text-2xl font-bold mb-2 text-green-500">Hệ Thống Âm Nhạc Tu Luyện</h2>
          <p className="text-muted-foreground mb-6">
            Kết nối với Spotify để nghe nhạc trong lúc tu luyện. Âm nhạc giúp tăng hiệu quả tu luyện và thư giãn tâm linh.
          </p>
          
          <div className="space-y-4 max-w-md mx-auto">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Truy cập hàng triệu bài hát</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Tạo playlist tu luyện riêng</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Đồng bộ với tài khoản Spotify</span>
            </div>
            
            <Button onClick={connectSpotify} className="w-full bg-green-600 hover:bg-green-700">
              <ExternalLink className="w-4 h-4 mr-2" />
              Kết Nối Spotify
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Music Player */}
      <Card className="p-4 bg-card/80 backdrop-blur-sm border-border/50">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-green-500 flex items-center gap-2">
            <Music className="w-5 h-5" />
            Âm Nhạc Tu Luyện
          </h2>
          <Badge className="bg-green-600 text-white">Đã kết nối</Badge>
        </div>

        {/* Current Playing */}
        {currentSong && (
          <div className="mb-4 p-3 bg-muted/20 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="font-medium">{currentSong.title}</h3>
                <p className="text-sm text-muted-foreground">{currentSong.artist}</p>
              </div>
              <Button size="sm" variant="ghost">
                <Heart className="w-4 h-4" />
              </Button>
            </div>
            
            {/* Progress Bar */}
            <div className="space-y-2">
              <Progress value={progress} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>1:23</span>
                <span>{currentSong.duration}</span>
              </div>
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <Button size="sm" variant="ghost">
            <Shuffle className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="ghost">
            <SkipBack className="w-4 h-4" />
          </Button>
          <Button onClick={togglePlay} className="w-12 h-12 rounded-full">
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </Button>
          <Button size="sm" variant="ghost">
            <SkipForward className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="ghost">
            <Repeat className="w-4 h-4" />
          </Button>
        </div>

        {/* Volume */}
        <div className="flex items-center gap-2">
          <Button 
            size="sm" 
            variant="ghost" 
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </Button>
          <Progress value={isMuted ? 0 : volume} className="h-2" />
        </div>
      </Card>

      {/* Search */}
      <Card className="p-4 bg-card/80 backdrop-blur-sm border-border/50">
        <div className="flex gap-2 mb-4">
          <Input
            placeholder="Tìm kiếm bài hát, nghệ sĩ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button>
            <Search className="w-4 h-4" />
          </Button>
        </div>

        {/* Search Results */}
        <div className="space-y-2">
          {mockSongs.map((song) => (
            <div key={song.id} className="flex items-center justify-between p-2 hover:bg-muted/20 rounded">
              <div className="flex items-center gap-3">
                <Button 
                  size="sm" 
                  variant="ghost"
                  onClick={() => setCurrentSong(song)}
                >
                  <Play className="w-3 h-3" />
                </Button>
                <div>
                  <p className="font-medium text-sm">{song.title}</p>
                  <p className="text-xs text-muted-foreground">{song.artist}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">{song.duration}</span>
                <Button size="sm" variant="ghost">
                  <Plus className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Playlists */}
      <Card className="p-4 bg-card/80 backdrop-blur-sm border-border/50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold flex items-center gap-2">
            <ListMusic className="w-4 h-4" />
            Playlist Tu Luyện
          </h3>
          <Button size="sm">
            <Plus className="w-3 h-3 mr-1" />
            Tạo mới
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {mockPlaylists.map((playlist) => (
            <Card key={playlist.id} className="p-3 hover:bg-muted/20 cursor-pointer">
              <div className="text-2xl mb-2">{playlist.image}</div>
              <h4 className="font-medium text-sm">{playlist.name}</h4>
              <p className="text-xs text-muted-foreground">{playlist.songs} bài hát</p>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default MusicSystem;
