import React from 'react';
import {unixTimeToString} from '../util';
import {Link} from 'react-router';
import {likeComment} from '../server'
import {unlikeComment} from '../server'
//import test from './feeditem'

export default class Comment extends React.Component {
  didUserLike() {
  var likeCounter = this.props.likeCounter;
  var liked = false;
  // Look for a likeCounter entry with userId 4 -- which is the
  // current user.
  for (var i = 0; i < likeCounter.length; i++) {
    if (likeCounter[i] === 4) {
      liked = true;
      break;
    }
  }
  return liked;
  }
  handleCommentLikeClick(clickEvent) {
    //console.log(this.props)
    //var temp = [1,2,3,4,5]
    // Stop the event from propagating up the DOM
    // tree, since we handle it here. Also prevents
    // the link click from causing the page to scroll to the top.
    clickEvent.preventDefault();
    // 0 represents the 'main mouse button' --
    // typically a left click
    // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button
    if (clickEvent.button === 0) {
      // Callback function for both the like and unlike cases.
      var callbackFunction = (updatedLikeCounter) => {
        // setState will overwrite the 'likeCounter'
        // field on the current state, and will keep
        // the other fields in-tact. This is called a
        // shallow merge:
        // https://facebook.github.io/react/docs/component-api.html#setstate
        this.setState({likeCounter: updatedLikeCounter});
      };
      if (this.didUserLike()) {
        // User clicked 'unlike' button.
        unlikeComment(1, 4, callbackFunction);
      } else {
        // User clicked 'like' button.
        likeComment(1, 4, callbackFunction);
      }
      //this.setState({likeCounter: temp});
    }

  }
  render() {
    var likeButtonText = "Like";
    if (this.didUserLike()){
      likeButtonText = "unlike";
    }
    return (
      <div>
        <div className="media-left media-top">
        PIC
        </div>
        <div className="media-body">
          <Link to={"/profile/" + this.props.author._id}>
            {this.props.author.fullName}
          </Link>
            {this.props.children}
          <br />{this.props.likeCounter.length} likes<a href="#" onClick={(e) => this.handleCommentLikeClick(e)}>
             {likeButtonText}</a> · <a href="#">Reply</a> ·
              {unixTimeToString(this.props.postDate)}
        </div>
      </div>
    )
  }
}
