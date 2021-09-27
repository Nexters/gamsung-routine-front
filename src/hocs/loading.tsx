import { observer } from 'mobx-react';
import React, {
  ClassicComponentClass,
  ComponentClass,
  ComponentProps,
  ForwardRefExoticComponent,
  FunctionComponent,
  ReactElement,
} from 'react';

type Component<Props = any> =
  | ClassicComponentClass<Props>
  | ComponentClass<Props>
  | FunctionComponent<Props>
  | ForwardRefExoticComponent<Props>;

export function loading<T extends Component>(Comp: T, condition: () => boolean, loader: ReactElement) {
  function LoadableComponent(props: ComponentProps<T>) {
    return (
      <>
        {condition() && loader}
        <Comp {...props} />
      </>
    );
  }

  return observer(LoadableComponent);
}
