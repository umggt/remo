/// <reference path="../angularjs/angular.d.ts" />

declare module remo {
	
	interface IUbuntuService {
		() : IOsProcessService;
	}
	
	interface IOsProcessService {
		listProcess(): ng.IPromise<IOsProcess>;
	}
	
	interface IOsProcess {
		id: String, 
		pcpu: String, 
		pmem: String, 
		time: String, 
		stat: String, 
		nlwp: String, 
		pri: String, 
		psr: String, 
		vsize: String, 
		command: String, 
		args: String;
	}
}