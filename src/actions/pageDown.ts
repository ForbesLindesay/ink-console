import Props from '../Props';
import State from '../State';
import down from './down';

export default function pageDown(s: State, props: Props): State {
  for (let i = 0; i < props.lines; i++) {
    s = down(s);
  }
  return s;
}
