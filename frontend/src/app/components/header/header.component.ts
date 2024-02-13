import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  activate =
    'bg-black/50 dark:bg-white/80 text-white/80 dark:text-black rounded-full font-bold';
  isDark = false;
  ngOnInit(): void {
    const preferDark =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.isDark = preferDark;
    document.body.classList.toggle('dark', preferDark);
  }
  changeTheme() {
    const dark = this.isDark;
    this.isDark = !dark;
    document.body.classList.toggle('dark', !dark);
  }
}
