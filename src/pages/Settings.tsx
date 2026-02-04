"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Users, Shield, Plus, Edit2, Trash2, UserPlus, Key } from 'lucide-react';
import { showSuccess } from '@/utils/toast';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive';
}

const initialUsers: User[] = [
  { id: '1', name: 'John Doe', email: 'john@bakery.com', role: 'Admin', status: 'Active' },
  { id: '2', name: 'Jane Smith', email: 'jane@bakery.com', role: 'Production Manager', status: 'Active' },
  { id: '3', name: 'Mike Ross', email: 'mike@bakery.com', role: 'Sales', status: 'Active' },
];

const Settings = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [userForm, setUserForm] = useState<Partial<User>>({ name: '', email: '', role: 'Sales', status: 'Active' });

  const handleOpenAddUser = () => {
    setEditingUser(null);
    setUserForm({ name: '', email: '', role: 'Sales', status: 'Active' });
    setIsUserDialogOpen(true);
  };

  const handleOpenEditUser = (user: User) => {
    setEditingUser(user);
    setUserForm(user);
    setIsUserDialogOpen(true);
  };

  const handleDeleteUser = (id: string) => {
    setUsers(users.filter(u => u.id !== id));
    showSuccess("User removed successfully");
  };

  const handleUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUser) {
      setUsers(users.map(u => u.id === editingUser.id ? { ...u, ...userForm } as User : u));
      showSuccess("User updated successfully");
    } else {
      const newUser = { ...userForm, id: Math.random().toString(36).substr(2, 9) } as User;
      setUsers([...users, newUser]);
      showSuccess("New user registered");
    }
    setIsUserDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-orange-50/30">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">System Settings</h1>
          <p className="text-gray-500">Manage users, roles, and system-wide configurations.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-white border-none shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between border-b border-orange-50">
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-orange-600" /> User Management
                </CardTitle>
                <Button onClick={handleOpenAddUser} className="bg-orange-600 hover:bg-orange-700 text-white rounded-xl">
                  <UserPlus className="mr-2 h-4 w-4" /> Add User
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-orange-50">
                  {users.map((user) => (
                    <div key={user.id} className="p-4 flex items-center justify-between hover:bg-orange-50/30 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-700 font-bold">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-100">
                          {user.role}
                        </Badge>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-orange-600" onClick={() => handleOpenEditUser(user)}>
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-red-600" onClick={() => handleDeleteUser(user.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-white border-none shadow-sm">
              <CardHeader className="border-b border-orange-50">
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-orange-600" /> Role Permissions
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-4">
                {['Admin', 'Production Manager', 'Store Keeper', 'Sales', 'Accountant'].map((role) => (
                  <div key={role} className="flex items-center justify-between p-3 rounded-xl border border-orange-50 hover:border-orange-200 transition-colors">
                    <span className="font-semibold text-gray-700">{role}</span>
                    <Button variant="ghost" size="sm" className="text-orange-600 hover:bg-orange-50">
                      Configure
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-orange-600 text-white border-none shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Key className="h-6 w-6" />
                  <h3 className="text-xl font-bold">Security Audit</h3>
                </div>
                <p className="text-orange-100 text-sm mb-6">Review recent login attempts and system changes for security compliance.</p>
                <Button className="w-full bg-white/10 hover:bg-white/20 text-white border-none">
                  View Audit Logs
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        <Dialog open={isUserDialogOpen} onOpenChange={setIsUserDialogOpen}>
          <DialogContent className="sm:max-w-[425px] rounded-2xl">
            <DialogHeader>
              <DialogTitle>{editingUser ? 'Edit User' : 'Register New User'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleUserSubmit} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input value={userForm.name} onChange={(e) => setUserForm({...userForm, name: e.target.value})} required />
              </div>
              <div className="space-y-2">
                <Label>Email Address</Label>
                <Input type="email" value={userForm.email} onChange={(e) => setUserForm({...userForm, email: e.target.value})} required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Role</Label>
                  <Select value={userForm.role} onValueChange={(v) => setUserForm({...userForm, role: v})}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Admin">Admin</SelectItem>
                      <SelectItem value="Production Manager">Production Manager</SelectItem>
                      <SelectItem value="Store Keeper">Store Keeper</SelectItem>
                      <SelectItem value="Sales">Sales</SelectItem>
                      <SelectItem value="Accountant">Accountant</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select value={userForm.status} onValueChange={(v: any) => setUserForm({...userForm, status: v})}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white rounded-xl">
                  {editingUser ? 'Update User' : 'Create User Account'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default Settings;