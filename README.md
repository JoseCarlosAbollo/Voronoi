This code generates a voronoi diagram with NUM randomly generated points in a SZE*SZE image that
can be downloaded pressing SPACE. The diagram can be made with Euclidean distance or with 
Manhattan distance (changing comments in lines 65 and 67). To see some interaction, the points are
drawn and when the mouse is clicked inside an area of the diagram, the nearest point is 
highlighted.

Possible improvements:
- It could be a function. In this case, it would be interesting being able to generate the diagram in two ways: 

	1) from SZE and NUM {e.g. voronoi(sze,num)}
	2) from SZE and a given array {e.g. voronoi(sze,points)}

Author: Abollo Palacios, José Carlos.

Date: 04/05/2019
