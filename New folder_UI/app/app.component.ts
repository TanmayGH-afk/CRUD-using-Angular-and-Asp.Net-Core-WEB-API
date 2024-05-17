import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardsService } from './service/cards.service';
import { response } from 'express';
import { Card } from './models/card.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'cards';
  cards: Card[] = [];
  card: Card = {
    id: '',
    cardNumber: '',
    cardHolderName: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: ''
  }

  constructor(private cardsService: CardsService) {

  }
  ngOnInit(): void {
    this.getAllCards();
  }

  getAllCards() {
    this.cardsService.getAllCards()
      .subscribe(
        response => {
          this.cards = response;
          
        }
      );
  }

  onSubmit() {
if(this.card.id ===''){
  this.cardsService.addCard(this.card)
      .subscribe(
        response => {
          this.getAllCards();
          this.card = {
            id: '',
            cardNumber: '',
            cardHolderName: '',
            expiryMonth: '',
            expiryYear: '',
            cvv: ''
          }
        }
      );
  }   else{
    this.updateCard(this.card);
  }
}

  deleteCard(id : string){
    this.cardsService.deleteCard(id)
    .subscribe(
      response =>{
        this.getAllCards();
      }
    )
  }

  populateForm(card:Card){
    this.card = card;
  }

  updateCard(card:Card){
    this.cardsService.updateCard(card)
    .subscribe(
      response=>{
        this.getAllCards();
      }
    )
  }
}
