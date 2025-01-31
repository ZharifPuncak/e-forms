"use client";

import * as React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";



export function PermissionsTable({ 	columns,
	hideHead,
	hover,
	onClick,
	onDeselectAll,
	onDeselectOne,
	onSelectOne,
	onSelectAll,
	rows,
	selectable,
	selected,
	uniqueRowId,
	...props}) {


	return <>
	
		<Table {...props}>
			<TableHead>
				<TableRow>
							{/* {columns.map((column) => (
								<TableCell
									key={column.name}
									sx={{
										width: column.width,
										minWidth: column.width,
										maxWidth: column.width,
										...(column.align && { textAlign: column.align }),
									}}
								>
									{column.hideName ? null : column.name}
								</TableCell>
							))} */}
							<TableCell>
								Module
							</TableCell>
							<TableCell>
								Action
							</TableCell>
				</TableRow>
				<TableRow>
							<TableCell>
								View
							</TableCell>
							<TableCell>
								Create
							</TableCell>
							<TableCell>
								Update
							</TableCell>
							<TableCell>
								Delete
							</TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
				{/* {rows.map((row, index) => {
					const rowId = row.id ?? uniqueRowId?.(row);
					const rowSelected = rowId ? selected?.has(rowId) : false;

					return (
						<TableRow
							hover={hover}
							key={rowId ?? index}
							selected={rowSelected}
							{...(onClick && {
								onClick: (event) => {
									onClick(event, row);
								},
							})}
							sx={{ ...(onClick && { cursor: "pointer" }) }}
						>
							{selectable ? (
								<TableCell padding="checkbox">
									<Checkbox
										checked={rowId ? rowSelected : false}
										onChange={(event) => {
											if (rowSelected) {
												onDeselectOne?.(event, row);
											} else {
												onSelectOne?.(event, row);
											}
										}}
										onClick={(event) => {
											if (onClick) {
												event.stopPropagation();
											}
										}}
									/>
								</TableCell>
							) : null}
							{columns.map((column) => (
								<TableCell key={column.name} sx={{ ...(column.align && { textAlign: column.align }) }}>
									{column.formatter ? column.formatter(row, index) : column.field ? row[column.field] : null}
								</TableCell>
							))}
						</TableRow>
					);
				})} */}
			</TableBody>
		</Table>
	</>;
}





