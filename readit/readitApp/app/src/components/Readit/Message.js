import React from 'react';

export default class Message extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      authed: props.authed,
      user: props.user
    }
  }

componentWillReceiveProps(props) {
    this.setState({authed: props.authed, user: props.user});
  }

  render(){

    var likedBy = this.props.post.likedBy;
    var likedStatus = 0;
    if(likedBy){
      likedBy.map( (item, index) => {
        if(item.uid === this.state.user.uid){
          likedStatus = item.likeStatus;
        }
      });
    }


    var eleDeleteButton, eleLikeDislike;
    if (this.props.authed && this.state.user && this.props.post.uid === this.state.user.uid) {
        eleDeleteButton = <button
            onClick={ this.props.removeMessage.bind(null) }
            className='btn btn-danger pull-right'>X
          </button>;        
    }

    eleLikeDislike = <span className="pull-right">
                        <i onClick={ this.props.likeMessage.bind(null)} className={"glyphicon glyphicon-thumbs-up " + (likedStatus == 1 ? 'text-info' : '')} style={{marginRight: '10px', 'cursor': 'pointer'}}></i>
                        <i onClick={ this.props.dislikeMessage.bind(null)} className={"glyphicon glyphicon-thumbs-down " + (likedStatus == 2 ? 'text-info' : '')} style={{'cursor': 'pointer'}}></i>
                      </span>

    

    return (
      <div className="panel panel-default">
        <div className="panel-body" onClick={ this.props.handleClick.bind(null) }
          className={ this.props.show ? 'bg-warning' : 'bg-info'} style={{padding: '10px'}}>
              <div className="row">
                <div className="col-md-8 col-sm-8">
                  <h3 className="RE_Msg" style={{margin: '0'}}> { this.props.post.message } </h3>
                </div>

                <div className="col-md-4 col-sm-4"> 
                  { eleDeleteButton }
                </div>
              </div>

        </div>
        <div className="panel-footer">
            <div className="row">
              <div className="col-md-10 col-sm-10 row">
                    <div className="col-md-4 col-sm-4 row"  style={{marginLeft: '0'}}> 
                        <b>Commented by:</b>
                    </div>
                    <div className="col-md-8 col-sm-8 row"> 
                        <div>{ this.props.post.addedByName } </div>
                    </div>

                    <div className="col-md-4 col-sm-4 row" style={{marginLeft: '0'}}> 
                        <b>Commented on:</b> 
                    </div>
                    <div className="col-md-8 col-sm-8 row"> 
                        <div><i>{ this.props.post.addedWhen } </i></div>
                    </div>
              </div>
              <div className="col-md-2 col-sm-2">
                    {eleLikeDislike}
                </div>
              </div>
            </div>
        </div>
    );
  }
};
