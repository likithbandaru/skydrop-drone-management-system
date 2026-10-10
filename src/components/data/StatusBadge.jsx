import React from 'react';
import { Badge } from '../ui/Badge';
import { 
  CheckCircle2, 
  Clock, 
  Navigation, 
  Plane, 
  AlertCircle, 
  Zap, 
  Wrench, 
  XCircle 
} from 'lucide-react';

export function StatusBadge({ status, className }) {
  if (!status) return null;
  const normalized = String(status).toUpperCase();

  switch (normalized) {
    // Delivery Order Statuses
    case 'IN_TRANSIT':
    case 'IN TRANSIT':
      return (
        <Badge variant="brand" className={className}>
          <Navigation className="w-3 h-3 animate-pulse" />
          In Transit
        </Badge>
      );
    case 'DELIVERED':
      return (
        <Badge variant="success" className={className}>
          <CheckCircle2 className="w-3 h-3" />
          Delivered
        </Badge>
      );
    case 'ASSIGNED':
      return (
        <Badge variant="info" className={className}>
          <Plane className="w-3 h-3" />
          Drone Assigned
        </Badge>
      );
    case 'PENDING':
      return (
        <Badge variant="warning" className={className}>
          <Clock className="w-3 h-3" />
          Pending
        </Badge>
      );
    case 'FAILED':
    case 'CANCELLED':
      return (
        <Badge variant="error" className={className}>
          <XCircle className="w-3 h-3" />
          Failed
        </Badge>
      );

    // Drone Operational Statuses
    case 'AVAILABLE':
      return (
        <Badge variant="success" className={className}>
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
          Available
        </Badge>
      );
    case 'IN_FLIGHT':
      return (
        <Badge variant="brand" className={className}>
          <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-ping"></span>
          In Flight
        </Badge>
      );
    case 'CHARGING':
      return (
        <Badge variant="warning" className={className}>
          <Zap className="w-3 h-3" />
          Charging
        </Badge>
      );
    case 'MAINTENANCE':
      return (
        <Badge variant="error" className={className}>
          <Wrench className="w-3 h-3" />
          Maintenance
        </Badge>
      );

    // General / Hub Statuses
    case 'ACTIVE':
    case 'TRUE':
      return (
        <Badge variant="success" className={className}>
          Active
        </Badge>
      );
    case 'INACTIVE':
    case 'FALSE':
      return (
        <Badge variant="secondary" className={className}>
          Inactive
        </Badge>
      );
    case 'NO_FLY_ZONE':
    case 'RESTRICTED':
      return (
        <Badge variant="error" className={className}>
          <AlertCircle className="w-3 h-3" />
          No-Fly Zone
        </Badge>
      );

    default:
      return <Badge variant="default" className={className}>{status}</Badge>;
  }
}


