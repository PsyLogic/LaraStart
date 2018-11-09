<template>
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Users List</h3>
                    <div class="card-tools">
                        <button type="button" class="btn btn-success" data-toggle="modal" @click="createModal"><i
                                class="fas fa-user-plus"></i> Add</button>
                    </div>
                </div>
                <!-- /.card-header -->
                <div class="card-body table-responsive p-0">
                    <table class="table table-hover">
                        <tbody>
                            <tr>
                                <th>ID</th>
                                <th>name</th>
                                <th>username</th>
                                <th>Email</th>
                                <th>Avatar</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Registred At</th>
                                <th>Actions</th>
                            </tr>
                            <tr v-for="user in users" :key="user.id">
                                <td>{{user.id}}</td>
                                <td>{{user.name | capitalize}}</td>
                                <td>{{user.username}}</td>
                                <td>{{user.email}}</td>
                                <td>{{user.avatar}}</td>
                                <td>{{user.type | capitalize}}</td>
                                <td><span class="badge" :class="(user.status == 1) ? 'badge-success' : 'badge-danger'">{{ userStatus(user.status) }}</span></td>
                                <td>{{ user.created_at | humainDate}}</td>
                                <td>
                                    <a href="#" class="btn btn-warning btn-sm" @click="updateUserModal(user)"><i class="fas fa-edit"></i></a>
                                    <a href="#" class="btn btn-danger btn-sm" @click="deleteUser(user.id)"><i class="fas fa-trash"></i></a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <!-- /.card-body -->
            </div>
        </div>
        <!-- Modal -->
        <div class="modal fade" id="UserModal" tabindex="-1" role="dialog" aria-labelledby="UserModalTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" v-if="!modeUpdate" id="exampleModalLongTitle">Add user</h5>
                        <h5 class="modal-title" v-else id="exampleModalLongTitle">Update user</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form @submit.prevent="createOrUpdate" @keydown="form.onKeydown($event)">
                        <div class="modal-body">
                            <div class="form-group">
                                <label>Name</label>
                                <input v-model="form.name" type="text" name="name"
                                    class="form-control" :class="{ 'is-invalid': form.errors.has('name') }">
                                <has-error :form="form" field="name"></has-error>
                            </div>

                            <div class="form-group">
                                <label>Username</label>
                                <input v-model="form.username" type="text" name="username"
                                    class="form-control" :class="{ 'is-invalid': form.errors.has('username') }">
                                <has-error :form="form" field="username"></has-error>
                            </div>
                            
                            <div class="form-group">
                                <label>Email</label>
                                <input v-model="form.email" type="text" name="email"
                                    class="form-control" :class="{ 'is-invalid': form.errors.has('email') }">
                                <has-error :form="form" field="email"></has-error>
                            </div>
                            
                            <div class="form-group">
                                <label>Type</label>
                                <select v-model="form.type" name="type" class="form-control" :class="{ 'is-invalid': form.errors.has('type') }">
                                    <option value="admin">admin</option>
                                    <option value="user">user</option>
                                    <option value="author">author</option>
                                </select>
                                <has-error :form="form" field="type"></has-error>
                            </div>
                            
                            <div class="form-group">
                                <label>Status</label><br>
                                <div class="custom-control custom-radio custom-control-inline">
                                    <input v-model="form.status" type="radio" id="active" value="1" name="status" class="custom-control-input" :class="{ 'is-invalid': form.errors.has('status') }" checked="checked"> 
                                    <label class="custom-control-label" for="active">Enable</label>
                                </div>
                                <div class="custom-control custom-radio custom-control-inline">
                                    <input v-model="form.status" type="radio" id="no-active" value="0" name="status" class="custom-control-input" :class="{ 'is-invalid': form.errors.has('status') }">
                                    <label class="custom-control-label" for="no-active">Disable</label>
                                </div>
                                <has-error :form="form" field="status"></has-error>
                            </div>

                            <div class="form-group">
                                <label>Password</label>
                                <input v-model="form.password" type="password" name="password"
                                    class="form-control" :class="{ 'is-invalid': form.errors.has('password') }">
                                <has-error :form="form" field="password"></has-error>
                            </div>

                            <div class="form-group">
                                <label for="password-confirm">Confirm Password</label>
                                <input id="password-confirm" v-model="form.password_confirmation" type="password" name="password_confirmation" class="form-control" >
                            </div>

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button :disabled="form.busy" v-if="!modeUpdate" type="submit" class="btn btn-success">Add</button>
                            <button :disabled="form.busy" v-else type="submit" class="btn btn-success">Update</button>
                        </div>
                    </form>
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
                    password: '',
                    password_confirmation: '',
                    type: '',
                    bio: '',
                    avatar: '',
                    status: '',
                }),
                modeUpdate:0,
                users:{}
            }
        },
        methods:{
            listusers(){
                this.$Progress.start();
                axios.get('api/users')
                    .then(({ data }) => {
                            this.users = data.data
                            this.$Progress.finish()
                        },
                        (response) =>
                        {
                            console.log(response)
                            this.$Progress.fail()
                        }
                    )

            },
            userStatus(status){
                return (status == 1) ? 'Approved' : 'Not Approved'
            },
            createModal(){
                this.form.reset();
                this.modeUpdate=0
                $('#UserModal').modal('show')
            },
            createOrUpdate(){
                // Submit the form via a POST request
                this.$Progress.start()

                if(!this.modeUpdate){
                    this.form.post('api/users')
                        .then(({ data }) => {
                            this.$Progress.finish()
                            $('#UserModal').modal('hide')
                            toast({
                                type: 'success',
                                title: 'User Created successfully'
                            })
                            this.listusers()
                        }).catch(()=>{
                            this.$Progress.fail()
                        })
                }else{
                    this.form.put('api/users/'+this.form.id)
                        .then(({ data }) => {
                            this.$Progress.finish()
                            $('#UserModal').modal('hide')
                            toast({
                                type: 'success',
                                title: 'User updated successfully'
                            })
                            this.listusers()
                        }).catch(()=>{
                            this.$Progress.fail()
                        })
                }
            },
            deleteUser(id){
                swal({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#d33',
                    cancelButtonColor: '#3085d6',
                    confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    if (result.value) {
                        axios.delete('api/users/'+id).then((response)=>{
                            swal(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                            this.listusers();
                        },
                            (response) =>
                            {
                                console.log(response)
                                this.$Progress.fail()
                            }
                        )
                    }
                })
            },
            updateUserModal(user){
                this.modeUpdate = 1
                this.form.reset();
                $('#UserModal').modal('show');
                this.form.fill(user);
            },
        },
        created(){
            this.listusers()
        }
    }
</script>
