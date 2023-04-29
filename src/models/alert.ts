import moment from 'moment';
import { useState } from 'react';

export default function useAlert() {
  const [options, alert] = useState<{
    open?: boolean;
    message?: string;
    type?: 'error' | 'warning' | 'info' | 'success';
    key: number;
  }>({ open: false, key: 1 });

  return {
    options,
    alert: (opt: {
      open?: boolean;
      message?: string;
      type?: 'error' | 'warning' | 'info' | 'success';
    }) => {
      alert({ ...opt, key: moment().unix() });
    },
  };
}
