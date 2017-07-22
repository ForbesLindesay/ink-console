import Props from '../Props';
import State from '../State';
import up from './up';

export default function pageUp(s: State, props: Props): State {
  for (let i = 0; i < props.lines; i++) {
    s = up(s, props);
  }
  return s;
}
