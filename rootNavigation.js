import * as React from 'react';

export const navigationRef = React.createRef();
export const navigation = navigationRef.current 
export function navigate(name, params) {
	navigationRef.current?.navigate(name, params);
}
export function dispatch(action) {
	navigationRef.current?.dispatch(action);
}
export function jumpTo(name, params) {
	navigationRef.current?.jumpTo(name, params);
}
export function goBack() {
	navigationRef.current?.goBack();
}
