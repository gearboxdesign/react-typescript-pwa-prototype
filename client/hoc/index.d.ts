import { ComponentType } from 'react';

interface IHOCComponent {
	wrappedComponent?: ComponentType;
}

export type HOCComponentType<TComponentProps = {}> = ComponentType<TComponentProps> & IHOCComponent;
