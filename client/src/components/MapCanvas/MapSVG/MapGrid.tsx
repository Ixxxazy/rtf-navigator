import {IViewBox} from "../Interfaces/Interfaces";
import React from "react";

type Props = {
	snap: number,
	viewBox: IViewBox
}
export const MapGrid = ({snap, viewBox,}: Props) => {
	return (
		<>
			<defs>
				<pattern id="smallGrid" patternUnits="userSpaceOnUse" height={snap} width={snap}>
					<path fill="none" stroke="gray" strokeWidth="0.5"
						  d={`M ${snap} 0 L 0 0 0 ${snap}`}></path>
				</pattern>
				<pattern id="grid" width={snap * 10} height={snap * 10}
						 patternUnits="userSpaceOnUse">
					<rect width={snap * 10} height={snap * 10} fill="url(#smallGrid)"></rect>
					<path d={`M ${snap * 10} 0 L 0 0 0 ${snap * 10}`} fill="none" stroke="gray"
						  strokeWidth="1"></path>
				</pattern>
			</defs>
			<rect style={{pointerEvents: "none"}}
				  width={viewBox.x + viewBox.width} height={viewBox.y + viewBox.height}
				  fill="url(#grid)"/>
		</>
	)
}