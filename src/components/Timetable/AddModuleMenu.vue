<template>
    <div class="wrapper">
        <div class="filter" id="priority"><select id="priority-level" required="required">
                <option value="HIGH">HIGH</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="LOW">LOW</option>
            </select><label for="priority-level">PRIORITY</label></div>
        <div class="filter" id="time-left"><input type="text" id="time" required="required" /><label for="time">TIME LEFT</label>
            <div class="separator"></div><select>
                <option value="Days">Days</option>
                <option value="%">%</option>
            </select>
        </div>
        <div class="filter" id="search"><input type="text" id="search-assignee" required="required" /><label for="search-assignee">SEARCH</label><i class="material-icons">search</i></div>
    </div>
</template>
<script>

export default ({
    name: 'AddModuleMenu',
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Josefin+Sans:400,600');
.filter {
	margin-right: 20px;
	width: 317px;
	height: 69px;
	border-radius: 4px;
	background-color: #fff;
	box-shadow: 0 0 30px 0 rgba(199, 199, 199, 0.25);
	position: relative;
	display: flex;
	align-items: center;
	padding: 0 20px;
	margin-bottom: 20px;
}
.filter label {
	font-size: 18px;
	font-weight: bold;
	color: rgba(33, 75, 93, 0.5);
	position: absolute;
	transition: 0.4s ease-in-out;
	margin-top: 2px;
}
.filter input {
	width: 200px;
	margin-top: 20px;
	order: none;
	outline: none;
	font-size: 20px;
	color: #214b5d;
	transition: 0.4s linear;
	border-bottom: 2px solid rgba(0, 0, 0, 0);
}
.filter input:focus {
	border-bottom: 2px solid rgba(0, 0, 0, 0.1);
}
.filter input:focus + label {
	font-size: 14px;
	margin-top: -15px;
}
.filter input:valid + label {
	font-size: 14px;
	margin-top: -15px;
}
#time-left select {
	width: 100px;
	border: none;
	font-size: 20px;
	color: #214b5d;
	outline: none;
}
#time-left .separator {
	width: 3px;
	height: 45px;
	background-color: rgba(0, 0, 0, 0.1);
	margin: 0 20px;
}
#priority select {
	width: 100%;
	border: none;
	font-size: 20px;
	color: #fff;
	outline: none;
	margin-left: -4px;
	padding-top: 20px;
}
 #priority select:focus {
	color: #214b5d;
}
 #priority select:valid {
	color: #214b5d;
}
#priority select:focus + label {
    font-size: 14px;
    margin-top: -15px;
}
#priority select:valid + label {
	font-size: 14px;
	margin-top: -15px;
}
#search input {
	width: 100%;
}
#search i {
	color: #214b5d;
}
 
</style>
