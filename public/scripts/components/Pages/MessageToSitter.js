import React from 'react';
import Message from '../../models/Message';
import {browserHistory} from 'react-router';
import $ from 'jquery';

export default React.createClass({
	getInitialState: function() {
		return {
			errors: {},
			message: new Message()
		};
	},

	render: function() {
		return (
			<section className='page-MessageToSitter'>
				<div className='container'>
					<h2>Send a message</h2>
						
					<div className='toprow row'>
						<div className='one-third column'>
							<p>Write a message to introduce yourself. Critter Sitter offers in-app messaging; otherwise, feel free to include
							your mobile or email address if you wish to communicate outside the app.</p>
						<div className='row'>
							<div>
									<img src='./../../../images/dog-and-cat-on-laptop.jpg'/>
							</div>
						</div>
						</div>
						<div className='two-thirds column'>
							<form onSubmit={this.sendMessage}>
									<div>					
										<textarea 
											placeholder='message to the sitter' 
											className='messageBody' 
											ref='messageTo' 
											name='messageTo' 
											rows='10'>
										</textarea>
									</div>
								<div className='offset-by-ten one column'>
									<button className="button-primary" type='submit'>Send</button>
								</div>
							</form>
						</div>						
					</div>				
				</div>
			</section>
		);
	}, 
	sendMessage: function(e){
		e.preventDefault();
		$.ajax({
			url:'/api/v1/Message',
			type: 'POST',
			headers: {
				Accept: 'application/json'
			},
			data: {
				recipientId: this.props.params.recipientId,
				messageBody: this.refs.messageTo.value
			},
			success: (msgSend)=>{
				this.state.message.set(msgSend);
			},
			error: (errArg)=>{
				console.log('message to sender did not post.');
				this.setState({errors: errArg.responseJSON});
			}
		});
		browserHistory.push('/browse');
	}
});







