import Props from '../Props';
import State from '../State';
import topStop from './topStop';

export default function expand(s: State, p: Props): State {
  if (s.depth <= 0) {
    return s;
  }
  return topStop({...s, depth: s.depth - 1}, p);
}
