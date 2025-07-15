// stores/hubStore.ts
import { makeAutoObservable, runInAction } from 'mobx';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { Comment } from '../models/comment';
import agent from '../api/agent';
import { store } from './store';

export default class CommentStore {
    hubConnection: HubConnection | null = null;
    comments: Comment[] = [];
    constructor() {
        makeAutoObservable(this);
    }

    createHubConnection = async (activityId: string) => {
        if (store.activityStore.selectedActivity) {

            this.hubConnection = new HubConnectionBuilder()
                .withUrl(`http://localhost:5086/chat?activityId=${activityId}`, {
                    accessTokenFactory: () => store.commonStore.token!,
                    withCredentials: true
                })
                .withAutomaticReconnect()
                .configureLogging(LogLevel.Information)
                .build();

            try {
               this.hubConnection
                    .start()
                    .then(() => {
                        console.log("Connected to SignalR hub successfully");
                    })
                    .catch(error => {
                        console.log("Error establishing connection: ", error);
                        console.log("Connection state:", this.hubConnection?.state);
                    });

                // // Add handlers
                // this.hubConnection.on('ReceiveComment', this.addCommentToStore);
                // Handle initial comments load
                this.hubConnection.on("LoadComments", (comments: Comment[]) => {
                    runInAction(() => {
                        // Format dates from strings to Date objects
                        comments.forEach(comment => {
                            comment.createdAt = new Date(comment.createdAt);
                        });
                        this.comments = comments;
                    });
                });

            } catch (error) {
                console.log('Error establishing connection:', error);
            }
        }
    }

    stopHubConnection = () => {
        this.hubConnection?.stop().catch(error => console.log('Error stopping connection:', error));
    }
    clearComments = () => {
        runInAction(() => {
            this.comments = [];
          });
        this.stopHubConnection();
    };
    // private addCommentToStore = (comment: Comment) => {
    //     // Implement this in your comment store
    //     this.comments.push(comment);
    // }

    // private setInitialComments = (comments: Comment[]) => {
    //     runInAction(() => {
    //         comments.forEach(comment => {
    //             comment.createdAt = new Date(comment.createdAt);
    //         });
    //         this.comments = comments;
    //     })
    // }

    // sendComment = async (command: CreateCommentCommand) => {
    //     try {
    //         await this.hubConnection?.invoke('SendComment', command);
    //     } catch (error) {
    //         console.log('Error sending comment:', error);
    //     }
    // }
}