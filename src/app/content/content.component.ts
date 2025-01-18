import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  standalone: false,
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  items: any[] = [];
  filteredItems: any[] = [];
  paginatedItems: any[] = [];
  searchTerm: string = '';
  showSortMenu: boolean = false;
  selectedCategories: any = {
    'e-Voucher': false,
    'Products': false,
    'Fashion & Retail': false
  };
  selectedCategoryCount: number = 0;
  categoryList = [
    { key: 'e-Voucher', name: 'e-Voucher' },
    { key: 'Products', name: 'Products' },
    { key: 'Fashion & Retail', name: 'Fashion & Retail' }
  ];
  page: number = 1;
  itemsPerPage: number = 4;
  totalPages: number = 1;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.items = this.dataService.getItems();
    this.filteredItems = [...this.items];
    this.calculateTotalPages();
    this.updatePagination();
    this.updateSelectedCategoryCount();
  }

  toggleSort(): void {
    this.showSortMenu = !this.showSortMenu;
  }

  sortItems(order: string): void {
    this.filteredItems.sort((a, b) => {
      if (order === 'asc') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    this.showSortMenu = false;
  }

  getSearchResults(): void {
    let results = [...this.items];

    if (Object.values(this.selectedCategories).some(value => value)) {
      results = results.filter(item =>
        Object.keys(this.selectedCategories).some(
          category => this.selectedCategories[category] && item.category === category
        )
      );
    }

    if (this.searchTerm) {
      results = results.filter(item =>
        item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    this.filteredItems = results;
    this.calculateTotalPages();
    this.updatePagination();
  }

  applyCategoryFilter(): void {
    this.getSearchResults();
  }

  updatePagination(): void {
    this.paginatedItems = this.filteredItems.slice(
      (this.page - 1) * this.itemsPerPage,
      this.page * this.itemsPerPage
    );
  }

  changePage(newPage: number): void {
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.page = newPage;
      this.updatePagination();
    }
  }

  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.filteredItems.length / this.itemsPerPage);
  }

  updateSelectedCategoryCount(): void {
    this.selectedCategoryCount = Object.values(this.selectedCategories).filter(
      (value) => value
    ).length;
  }

  removeCategoryFilter(category: any): void {
    this.selectedCategories[category] = false;
    this.applyCategoryFilter();
  }
}
