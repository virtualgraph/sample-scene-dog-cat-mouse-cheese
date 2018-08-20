import { Vector3Component } from "metaverse-api";

export namespace Grid
{
	const grid: boolean[][] = [];

	export function init(width: number, depth: number)
	{
		grid.length = 0;
		for (let x = 0; x < width; x++)
		{
			grid.push([]);
			for (let y = 0; y < depth; y++)
			{
				grid[x].push(false);
			}
		}
	}

	export function set(position: Vector3Component, canBeOccupiedAlready: boolean = false)
	{
		const x = Math.round(position.x);
		const z = Math.round(position.z);
		if (grid[x][z] && !canBeOccupiedAlready)
		{
			throw new Error("Grid cell is already set");
		}
		grid[x][z] = true;
	}

	export function clear(position: Vector3Component)
	{
		const x = Math.round(position.x);
		const z = Math.round(position.z);
		if (!grid[x][z])
		{
			throw new Error("Grid cell wasn't set");
		}
		grid[x][z] = false;
	}

	export function isAvailable(position: Vector3Component)
	{
		const x = Math.round(position.x);
		const z = Math.round(position.z);
		if (x < 0 || z < 0 || grid.length <= x || grid[x].length <= z)
		{
			return false;
		}
		return !grid[x][z];
	}

	export function randomPosition(border: number = 1, mustBeAvailable: boolean = true): Vector3Component
	{
		let position;
		do
		{
			position = {
				x: Math.random() * (grid.length - border * 2) + border,
				y: 0,
				z: Math.random() * (grid[0].length - border * 2) + border
			};
		} while (!isAvailable(position) && mustBeAvailable);

		return position;
	}
}