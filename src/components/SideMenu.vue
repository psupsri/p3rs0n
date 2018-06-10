<template>
  <aside class="menu box">
    <p class="menu-label">
      ทั่วไป
    </p>
    <ul class="menu-list">
      <li><router-link to="/home" exact>หน้าแรก</router-link></li>
    </ul>
    <ul class="menu-list">
      <li><router-link to="/people" exact>ข้อมูลบุคคล</router-link></li>
    </ul>
    <p class="menu-label">
      ผู้ดูแลระบบ
    </p>
    <ul class="menu-list">
      <li>
        <a>ข้อมูลผู้ใช้ระบบ</a>
        <ul>
          <li><router-link to="/user" exact>จัดการข้อมูล</router-link></li>
          <!-- <li><router-link to="/user/report">ดูรายงาน</router-link></li> -->
        </ul>
      </li>
    </ul>
  </aside>
</template>
