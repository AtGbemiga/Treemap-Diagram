let url = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json'
let value = []
let svg = d3.select('#map-svg')
let tooltip = d3.select('#tooltip')

const plotMap = () => {
    let hierarchy = d3.hierarchy(value, node => {
        return node.children
    }).sum(node => {
        return node.value
    }).sort((node1, node2) => {
        return node2.value - node1.value
    })

    let createTreeMap = d3.treemap()
        .size([1000, 600])
    createTreeMap(hierarchy)

    let movieTiles = hierarchy.leaves()
    console.log(movieTiles)

    let block = svg.selectAll('g')
        .data(movieTiles)
        .enter()
        .append('g')
        .attr('transform', item => {
            return `translate(${item.x0}, ${item.y0})`
        })

    block.append('rect')
        .attr('class', 'tile')
        .attr('fill', item => {
            if (item.data.category === 'Action') {
                return 'rgb(222, 82, 83)'
            } else if(item.data.category === 'Adventure') {
                return 'rgb(173, 229, 161)'
            } else if(item.data.category === 'Comedy') {
                return 'rgb(193, 209, 151)'
            }
            else if(item.data.category === 'Drama') {
                return 'rgb(43, 229, 161)'
            }
            else if(item.data.category === 'Animation') {
                return 'rgb(200, 229, 161)'
            }
            else if(item.data.category === 'Family') {
                return 'rgb(90, 235, 111)'
            } else if(item.data.category === 'Biography') {
                return 'rgb(230, 25, 111)'
            } else {
                return 'white'
            }
        })
        .attr('data-name', item => {
            return item.data.name
        })
        .attr('data-category', item => {
            return item.data.category
        })
        .attr('data-value', item => {
            return item.data.value
        })
        .attr('width', item => {
            return item.x1 - item.x0
        })
        .attr('height', item => {
            return item.y1 - item.y0
        })
        .on('mouseover', item => {
            tooltip.style('visibility', 'visible')
            tooltip.text(`${item.data.name} ${item.data.category} ${item.data.value}`)
            .attr('data-value', item.data.value)
        })
        .on('mouseout', item => {
            tooltip.style('visibility', 'hidden')
        })

    block.append('text')
        .text(item => {
            return item.data.name
        })
        .attr('x', 5)
        .attr('y', 15)
}

d3.json(url).then(
    (data, error) => {
        if(error){
            console.log(error)
        }else{
            value = data
            console.log('value')
            console.log(value)
            plotMap()
        }
    }
)