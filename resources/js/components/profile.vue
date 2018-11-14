<style>
.widget-user .widget-user-image{
    top:195px;
}
.widget-user .widget-user-image>img{
    height:90px;
}
</style>
<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-12">
                <div class="card card-widget widget-user">
                    <div class="widget-user-header text-white" style="background: url('images/bg-profile.jpg') center center; height: 250px;">
                        <h3 class="widget-user-username">{{form.name}}</h3>
                        <h5 class="widget-user-desc">Web Designer</h5>
                    </div>
                    <div class="widget-user-image">
                        <img class="img-circle" :src="form.avatar" alt="User Avatar">
                    </div>
                    <div class="card-footer">
                        <div class="row">
                            <div class="col-sm-4 border-right">
                                <div class="description-block">
                                    <h5 class="description-header">3,200</h5>
                                    <span class="description-text">SALES</span>
                                </div>
                            </div>
                            <div class="col-sm-4 border-right">
                                <div class="description-block">
                                    <h5 class="description-header">13,000</h5>
                                    <span class="description-text">FOLLOWERS</span>
                                </div>
                            </div>
                            <div class="col-sm-4">
                                <div class="description-block">
                                    <h5 class="description-header">35</h5>
                                    <span class="description-text">PRODUCTS</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12">
                <div class="card">
                    <div class="card-header p-2">
                        <ul class="nav nav-pills">
                            <li class="nav-item"><a class="nav-link active show" href="#activity" data-toggle="tab">Activity</a></li>
                            <li class="nav-item"><a class="nav-link" href="#settings" data-toggle="tab">Settings</a></li>
                        </ul>
                    </div><!-- /.card-header -->
                    <div class="card-body">
                        <div class="tab-content">
                            <div class="tab-pane active show" id="activity">
                                <h1>Activity</h1>
                            </div>
                            <!-- /.tab-pane -->
                            <div class="tab-pane" id="settings">
                                <form class="form-horizontal" @submit.prevent="update" @keydown="form.onKeydown($event)" enctype="multipart/form-data">
                                    <input type="hidden" id="id" name="id" v-model="form.id">
                                    <div class="form-group">
                                        <label for="name" class="col-sm-2 control-label">Name</label>

                                        <div class="col-sm-10">
                                            <input v-model="form.name" type="text" class="form-control" name="name" id="name" placeholder="Name">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="username" class="col-sm-2 control-label">username</label>

                                        <div class="col-sm-10">
                                            <input v-model="form.username" type="text" class="form-control" name="username" id="username" placeholder="username">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="email" class="col-sm-2 control-label">Email</label>

                                        <div class="col-sm-10">
                                            <input v-model="form.email" type="email" class="form-control" id="email" name="email" placeholder="Email">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="bio" class="col-sm-2 control-label">Bio</label>

                                        <div class="col-sm-10">
                                            <textarea v-model="form.bio" class="form-control" name="bio" id="bio" placeholder="Bio"></textarea>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="avatar" class="col-sm-2 control-label">Avatar</label>
                                        <div class="col-sm-10">
                                            <input type="file" class="form-control" name="avatar" id="avatar">
                                        </div>
                                    </div>
                                    <hr>
                                    <div class="form-group">
                                        <div class="col-sm-offset-2 col-sm-10">
                                            <button type="submit" class="btn btn-success">+ Save Changes</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div><!-- /.card-body -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                form: new Form({
                    id: '',
                    name: '',
                    username: '',
                    email: '',
                    bio: '',
                    avatar: '',
                }),
            }
        },
        created(){
            axios.get('api/profile')
                .then(({data}) => {this.form.fill(data)} )
        },
        methods:{
            update(e){
                let data = new FormData(e.target)
                axios.post('api/profile/edit/'+this.form.id,data).
                then(({data}) => {
                    this.form.fill(data)
                    $('#avatar').val('');
                })
            }
        }
    }
</script>
