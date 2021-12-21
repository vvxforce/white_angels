import * as React from "react";
import arrowL from '../img/arrowL.png';
import arrowR from '../img/arrowR.png';
import axios from "axios";



export default class CardSlider extends React.Component {

  static defaultProps = {
    opacity: 0.9,
    scale: 0.9,
    loop: false,
    disablePrev: false,
    disableNext: false
  };

  constructor(props) {
    super(props);
    this.state = {
      activeIndex: props.index || 0,
      moving: false,
      list: []
    };
  }

  componentDidMount() {
    axios.get("http://188.40.180.193:5000/api/products")
      .then(res => {
        this.setState({ list: res.data })
      })
      .catch(error => {
        console.log(error)
      })
  }

  

  componentWillReceiveProps(nextProps) {
    if (this.props.index !== nextProps.index) {
      this.setState({
        activeIndex: nextProps.index
      });
    }
  }

  get totalCount() {
    return this.state.list.length;
    //return this.state.list.length;
  }

  get gridWidth() {
    const isEven = this.totalCount % 2 !== 0;
    const { width, boxWidth } = this.props;
    return (
      (boxWidth - width) / (isEven ? this.totalCount : this.totalCount - 1)
    );
  }



  getDirection(index) {
    const { activeIndex } = this.state;
    let direction = 1;
    if (
      index - activeIndex > this.totalCount / 2 ||
      (index - activeIndex < 0 && index - activeIndex > -this.totalCount / 2)
    ) {
      direction = -1;
    }

    let offset = Math.abs(index - activeIndex);
    if (offset > this.totalCount / 2) {
      offset = activeIndex + this.totalCount - index;
    }
    if (index - activeIndex < -this.totalCount / 2) {
      offset = this.totalCount + index - activeIndex;
    }
    return {
      direction,
      offset
    };
  }

  render() {
    const {
      products,
      renderItem,
      opacity,
      scale,
      width,
      boxWidth,
      style,
      list, 
    } = this.props;

    console.log(this.state.list.length)
    return (
      <div style={{ ...styles.wrapper, style }}>
        <div style={{ ...styles.content, width: boxWidth }}>
          {this.state.list
          .map((data, index) => {
            const { direction, offset } = this.getDirection(index);
            const realScale = Math.pow(scale, offset);
            return renderItem({
              key: index,
              ...data,
              style: {
                position: "absolute",
                left: "50%",
                marginLeft:
                  this.gridWidth * direction * offset +
                  direction * ((width / 2) * (1 - realScale)),
                zIndex: this.totalCount - offset,
                opacity: Math.pow(opacity, offset),
                transform: `translateX(-50%) scale(${realScale})`,
                transition: "all 500ms"
              }
            });
          })}
        </div>
        <div className="arrows">
          <button
            style={{ ...styles.btn, left: 100 }}
            onClick={this.handlePrev}
          >
            <img src={arrowL} alt="Previous" />
          </button>
          <button
            style={{ ...styles.btn, right: 100 }}
            onClick={this.handleNext}
          >
            <img src={arrowR} alt="Next" />
          </button>
          </div> 
      </div>
    );
  }

  

  handlePrev = () => {
    let { activeIndex } = this.state;
    if (this.disablePrev) return;
    activeIndex = --activeIndex < 0 ? this.totalCount - 1 : activeIndex;
    this.setState({ activeIndex });
    this.handleChange(activeIndex);
  };

  handleNext = () => {
    let { activeIndex } = this.state;
    if (this.disableNext) return;
    activeIndex = ++activeIndex >= this.totalCount ? 0 : activeIndex;
    this.setState({ activeIndex });
    this.handleChange(activeIndex);
  };

  handleChange = (index) => {
    const { list, onChange } = this.props;
    onChange && onChange(index, list[index]);
  };
}

const styles = {
  wrapper: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%"
  },

  content: {
    height: 400,
    position: "relative",
  },

  btn: {
    width: 36,
    height: 36,
    zIndex: 99,
    border: 0,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 24,
    margin: "0 80px",
    background: 'none'
  }
};
