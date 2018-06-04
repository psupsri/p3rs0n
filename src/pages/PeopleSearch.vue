<template>
  <div class="box">
    <p class="title is-5">ระบบค้นหาข้อมูล</p>
    <div class="field has-addons">
      <div class="control is-expanded">
        <input class="input" type="text" placeholder="Find a repository">
      </div>
      <p class="control">
        <span class="select">
          <select>
            <option>ชื่อจริง</option>
            <option>นามสกุล</option>
            <option>อีเมล์</option>
            <option>เบอร์โทร</option>
            <option>เพศ</option>
            <option>กลุ่มเลือด</option>
            <option>ศาสนา</option>
            <option>สถานภาพ</option>
          </select>
        </span>
      </p>
      <div class="control">
        <a class="button is-info">
          ค้นหา
        </a>
      </div>
    </div>
    <div class="column">
      <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
        <thead>
          <tr>
            <td>ลำดับ</td>
            <td>ชื่อจริง</td>
            <td>นามสกุล</td>
            <td>อีเมล์</td>
            <td>เบอร์โทร</td>
            <td>เพศ</td>
            <td>กลุ่มเลือด</td>
            <td>ศาสนา</td>
            <td>สถานภาพ</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
