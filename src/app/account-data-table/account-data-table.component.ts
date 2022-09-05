import {Component} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

import usersData from 'src/accounts.json';
import { User } from '../user';
import { UserService } from '../user.service';

let Users : User[] = usersData;

/**
 * @title Table with expandable rows
 */
@Component({
  selector: 'account-data-table',
  styleUrls: ['account-data-table.component.scss'],
  templateUrl: 'account-data-table.component.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AccountDataTableComponent {
  dataSource = usersData;
  columnsToDisplay = ['account_number', 'balance', 'firstname', 'lastname', 'age', 'gender'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement !: User | null;
}

//, 'address', 'employer', 'email', 'city', 'state'