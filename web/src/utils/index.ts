import { NIcon } from 'naive-ui';
import { h } from 'vue';

export function renderIcon(icon) {
    return () => h(NIcon, null, { default: () => h(icon) });
  }