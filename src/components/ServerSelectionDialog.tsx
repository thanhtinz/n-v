
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { 
  Server,
  Users,
  Clock,
  Zap
} from 'lucide-react';

interface Server {
  id: string;
  name: string;
  status: 'online' | 'maintenance';
  population: 'Đông' | 'Vừa' | 'Ít';
  type: 'Mới' | 'Cũ';
  players: number;
}

interface ServerSelectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedServer: string;
  onSelectServer: (serverId: string) => void;
  servers: Server[];
}

const ServerSelectionDialog = ({ 
  open, 
  onOpenChange, 
  selectedServer, 
  onSelectServer, 
  servers 
}: ServerSelectionDialogProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-400';
      case 'maintenance': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'online': return 'Hoạt động';
      case 'maintenance': return 'Bảo trì';
      default: return 'Offline';
    }
  };

  const getPopulationColor = (population: string) => {
    switch (population) {
      case 'Đông': return 'text-red-400 bg-red-400/10';
      case 'Vừa': return 'text-yellow-400 bg-yellow-400/10';
      case 'Ít': return 'text-green-400 bg-green-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const handleSelectServer = (serverId: string) => {
    onSelectServer(serverId);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-gradient-to-b from-amber-50/95 to-amber-100/95 backdrop-blur-sm border-2 border-amber-300/50">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-amber-800 flex items-center justify-center gap-2">
            <Server className="w-6 h-6" />
            Chọn Server
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-3 max-h-96 overflow-y-auto">
          {servers.map((server) => (
            <Card
              key={server.id}
              className={`p-4 cursor-pointer transition-all hover:shadow-lg border-2 ${
                selectedServer === server.id
                  ? 'border-amber-500 bg-amber-200/50'
                  : 'border-amber-200 bg-white/80 hover:border-amber-400'
              }`}
              onClick={() => handleSelectServer(server.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-600 to-amber-700 flex items-center justify-center">
                    <Server className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-amber-800">{server.name}</h4>
                    <div className="flex items-center gap-2 text-sm">
                      <span className={getStatusColor(server.status)}>
                        {getStatusText(server.status)}
                      </span>
                      <span className="text-amber-600">•</span>
                      <Badge variant="outline" className={`text-xs ${getPopulationColor(server.population)}`}>
                        {server.population}
                      </Badge>
                      {server.type === 'Mới' && (
                        <Badge className="text-xs bg-gradient-to-r from-green-500 to-green-600 text-white">
                          Mới
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center gap-1 text-amber-700">
                    <Users className="w-4 h-4" />
                    <span className="font-semibold">{server.players.toLocaleString()}</span>
                  </div>
                  <div className="text-xs text-amber-600">người chơi</div>
                </div>
              </div>

              {selectedServer === server.id && (
                <div className="mt-3 pt-3 border-t border-amber-300">
                  <div className="flex items-center justify-center">
                    <Badge className="bg-gradient-to-r from-amber-600 to-amber-700 text-white">
                      <Zap className="w-3 h-3 mr-1" />
                      Server đã chọn
                    </Badge>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>

        <div className="flex justify-center pt-4">
          <Button 
            onClick={() => onOpenChange(false)}
            className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-8"
          >
            Xác nhận
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServerSelectionDialog;
