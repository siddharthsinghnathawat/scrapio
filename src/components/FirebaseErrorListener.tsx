
'use client';

import { useEffect } from 'react';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/error';
import { useToast } from '@/hooks/use-toast';

export function FirebaseErrorListener() {
  const { toast } = useToast();

  useEffect(() => {
    const handlePermissionError = (error: FirestorePermissionError) => {
      // In development, Next.js will catch uncaught errors and show a red overlay.
      // We throw it here to trigger that overlay with contextual info.
      if (process.env.NODE_ENV === 'development') {
        throw error;
      } else {
        toast({
          variant: 'destructive',
          title: 'Permission Denied',
          description: `You don't have permission to ${error.context.operation} this data.`,
        });
      }
    };

    errorEmitter.on('permission-error', handlePermissionError);
    return () => {
      errorEmitter.off('permission-error', handlePermissionError);
    };
  }, [toast]);

  return null;
}
